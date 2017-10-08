import registerApi from './server.api';
import { connectMongo } from './server.mongoose';

const express = require('express');

const app = express();

const start = async () => {
    if(await connectMongo()){
        const apiRoute = express.Router();
        registerApi(apiRoute);

        app.use('/', apiRoute);

        app.listen(3000);
    }
};

if(start()){}
