require('dotenv').config();
const express = require('express');
const { json, urlencoded } = require('express');
const { connect } = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const router = require('./routes');
const { errorMassage, statusCodeName } = require('./utils/constants');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT, MONGO_DB_CONNECT, NODE_ENV } = process.env;

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));

connect(NODE_ENV === 'production' ? MONGO_DB_CONNECT : 'mongodb://localhost:27017/devdb', {
  useNewUrlParser: true,
});

app.use(cors());
app.use(requestLogger);
app.use('/', router);
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || statusCodeName.ERROR_INTERNAL_SERVER;
  const message = statusCode === statusCodeName.ERROR_INTERNAL_SERVER
    ? errorMassage.PAGE_500
    : err.message;

  res.status(statusCode).send({ message });
  next();
});

app.listen(PORT);

module.exports = app;
