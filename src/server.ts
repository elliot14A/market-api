import config from 'config';
import { Express } from 'express';
import  { connect } from './utils/connection';
import app from './app';

const port = config.get<number>('port');
const uri = config.get<string>('uri');

async function main(app: Express) {
    app.listen(port,async () => {
        await connect(uri);
        console.log(`server started at port:${port}`);
    });
}

main(app)
    .catch(err => console.log(err));