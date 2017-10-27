import registerApi from './server.api';
import { connectMongo } from './server.mongoose';
const path = require('path');
const bodyParser = require('body-parser');

const express = require('express');

const app = express();

const start = async () => {
    if(await connectMongo()){
        const apiRoute = express.Router();
        registerApi(apiRoute);

        // Parsers for POST data
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));

        const t = path.join(__dirname, '../dist');
        console.log(t);
        app.use(express.static(t));

        app.use('/', apiRoute);

        app.get('*', (req, res) => {
            res.sendFile('D:\\Projects\\node\\legendary-octo-broccoli\\dist\\index.html');
        });

        app.listen(3000);
    }
};

if(start()){}
