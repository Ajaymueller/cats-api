const express = require('express');

const catRouter = require('./routes/cats');

const app = express();

app.use(express.json());

app.use('/cat', catRouter);

module.exports = app;
