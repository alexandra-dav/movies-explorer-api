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
    owner: req.user._id,
    country: req.body.country,
    director: req.body.director,
    duration: req.body.duration,
    year: req.body.year,
    description: req.body.description,
    image: req.body.image,
    // trailerLink: req.body.trailerLink,
    trailerLink: req.body.trailer,
    thumbnail: req.body.thumbnail,
    movieId: req.body.movieId,
    nameRU: req.body.nameRU,
    nameEN: req.body.nameEN,
  })
    .then((movie) => Movies.findById(movie._id))
    .then((fullMovie) => res.status(statusCodeName.CREATED).send(fullMovie))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NoValidationError(errorMassage.MOVIE_NOT_VALID));
      } else { next(err); }
    });
};
module.exports.deleteMovies = (req, res, next) => {
  Movies.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(errorMassage.MOVIE_NOT_VALID);
      }
      if (req.user._id !== movie.owner) {
        throw new ForbiddenError(errorMassage.MOVIE_ERROR_CREDENTINAL);
      }
      return Movies.findByIdAndRemove(movie._id);
    })
    .then((movieData) => res.send(movieData))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NoValidationError(errorMassage.MOVIE_NOT_FOUND));
      } else { next(err); }
    });
};
