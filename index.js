const express = require('express');

const apiRouter = require('./routes/apiroutes');
const htmlRouter = require('./routes/htmlroutes');

const app = express();

app.use('/api', apiRouter);
app.use('/', htmlRouter);

module.exports = app;