import registerApi from './server.api';
import { connect } from './server.mongoose';

const express = require('express');

const app = express();

const start = async () => {
    if(await connect()){
        const apiRoute = express.Router();
        registerApi(apiRoute);

        app.use('/', apiRoute);

        app.listen(3000);
    }
};

if(start()){}
