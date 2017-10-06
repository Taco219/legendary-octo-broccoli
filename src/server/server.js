import  registerApi from './server.api';

const express = require('express');
const app = express();

const apiRoute = express.Router();
registerApi(apiRoute);

app.use('/', apiRoute);

app.listen(3000);