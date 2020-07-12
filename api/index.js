const express = require('express');
const bodyParser = require('body-parser');

const config = require('../config.js');
const comentarios = require('./components/comentarios/network');
const errors = require('../network/errors');

const app = express();

app.use(bodyParser.json());

// ROUTER
app.use('/api/comentarios', comentarios);

app.use(errors);

app.listen(config.server.port, () => {
    console.log('Api escuchando en el puerto ', config.server.port);
});