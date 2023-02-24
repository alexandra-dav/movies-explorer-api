require('dotenv').config();
const express = require('express');
const { json, urlencoded } = require('express');
const { connect } = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes');
const commonError = require('./middlewares/common-err');
const { apiLimiter } = require('./utils/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, MONGO_DB_CONNECT, NODE_ENV } = process.env;

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));

connect(NODE_ENV === 'production' ? MONGO_DB_CONNECT : 'mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

app.use(cors());
app.use(helmet());
app.use(requestLogger);
app.use(apiLimiter);
app.use('/', router);
app.use(errorLogger);
app.use(errors());
app.use(commonError);

app.listen(PORT);

module.exports = app;
