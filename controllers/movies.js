const Movies = require('../models/movies');
const { errorMassage, statusCodeName } = require('../utils/constants');
const NotFoundError = require('../errors/not-found-err');
const NoValidationError = require('../errors/no-validation-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.showMovies = (req, res, next) => {
  Movies.find({ owner: req.user._id })
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};
module.exports.createMovies = (req, res, next) => {
  Movies.create({
    ...req.body,
    owner: req.user._id,
  })
    .then((movie) => Movies.findById(movie._id))
    .then((fullMovie) => res.status(statusCodeName.CREATED).send(fullMovie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new NoValidationError(errorMassage.MOVIE_NOT_VALID));
      }
      return next(err);
    });
};
module.exports.deleteMovies = (req, res, next) => {
  Movies.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(errorMassage.MOVIE_NOT_VALID);
      }
      if (req.user._id !== movie.owner.toString()) {
        throw new ForbiddenError(errorMassage.MOVIE_ERROR_CREDENTINAL);
      }
      return Movies.findByIdAndRemove(movie._id);
    })
    .then((movieData) => res.send(movieData))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new NoValidationError(errorMassage.MOVIE_NOT_FOUND));
      } return next(err);
    });
};
