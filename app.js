require('dotenv').config();
const express = require('express');
const { json, urlencoded } = require('express');
const { connect } = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const router = require('./routes');
const commonError = require('./middlewares/common-err');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT, MONGO_DB_CONNECT, NODE_ENV } = process.env;

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));

connect(NODE_ENV === 'production' ? MONGO_DB_CONNECT : 'mongodb://localhost:27017/devdb', {
  useNewUrlParser: true,
});

app.use(cors());
app.use(helmet());
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(apiLimiter);
app.use(requestLogger);
app.use('/', router);
app.use(errorLogger);
app.use(errors());
app.use(commonError);

app.listen(PORT);

module.exports = app;
