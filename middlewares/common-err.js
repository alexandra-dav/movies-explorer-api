const { errorMassage, statusCodeName } = require('../utils/constants');

const commonError = (err, req, res, next) => {
  const statusCode = err.statusCode || statusCodeName.ERROR_INTERNAL_SERVER;
  const message = statusCode === statusCodeName.ERROR_INTERNAL_SERVER
    ? errorMassage.PAGE_500
    : err.message;

  res.status(statusCode).send({ message });
  next();
};

module.exports = commonError;
