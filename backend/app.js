const express = require('express');
const cors = require('cors');
const routes = require('./src/routes');
const notFound = require('./src/middlewares/notFound.middleware');
const errorHandler = require('./src/middlewares/errorHandler.middleware');

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
