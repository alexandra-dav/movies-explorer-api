const router = require('express').Router();
const { showMovies, createMovies, deleteMovies } = require('../controllers/movies');
const { checkMovieDataCreate, checkMovieID } = require('../middlewares/validation');

router.get('/', showMovies);
router.post('/', checkMovieDataCreate, createMovies);
router.delete('/:_id', checkMovieID, deleteMovies);

module.exports = router;
