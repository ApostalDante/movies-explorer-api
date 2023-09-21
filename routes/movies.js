const router = require('express').Router();

const {
  createMovie,
  deleteMovie,
  getMovie,
} = require('../controllers/movies');

const {
  validateCreateMovie,
  validateMovieId,
} = require('../utils/validation');

router.get('/', getMovie);
router.post('/', validateCreateMovie, createMovie);
router.delete('/:movieId', validateMovieId, deleteMovie);

module.exports = router;
