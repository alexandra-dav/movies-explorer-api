const express = require('express');
const { json, urlencoded } = require('express');
const { connect } = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const router = require('./routes/index');
const {
  errorMassage, statusCodeName,
} = require('./utils/constants');

const { PORT = 3000 } = process.env;
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));

connect('mongodb://localhost:27017/bitfilmsdb', {
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

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});

module.exports = app;
