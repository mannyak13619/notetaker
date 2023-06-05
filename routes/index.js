const express = require('express');

const apiRouter = require('./apiroutes');
const htmlRouter = require('./htmlroutes');

const app = express();

app.use('/api', apiRouter);
app.use('/', htmlRouter);

module.exports = app;