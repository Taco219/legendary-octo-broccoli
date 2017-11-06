import registerApi from './server.api';
import { connectMongo } from './server.mongoose';
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const app = express();

const start = async () => {
    if(await connectMongo()){
        const apiRoute = express.Router();
        registerApi(apiRoute);

        // Parsers for POST data
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(cors());
        app.use('/api', apiRoute);


        const out = path.join(__dirname, '../dist');
        app.use(express.static(out));
        app.get('*', (req, res) => {
            res.sendFile(out+'/index.html');
        });

        app.listen(3000);
    }
};

if(start()){}
