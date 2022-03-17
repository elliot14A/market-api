import mongoose from "mongoose";

export const connect = async function(uri: string) {
    try {
        await mongoose.connect(uri);
        console.log("MongoDB is connected");
    } catch(err) {
        throw err;
    }
}

export const disconnect = async function() {
    try {
        mongoose.connection.dropDatabase();
        await mongoose.disconnect();
    } catch(err) {
        throw(err);
    }
}