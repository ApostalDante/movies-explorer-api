const Movie = require('../models/movie');
const BadRequest = require('../utils/errors/BadRequest');
const NotFound = require('../utils/errors/NotFound');
const Forbidden = require('../utils/errors/Forbidden');

const createMovie = (req, res, next) => {
  const owner = req.user._id;
  return Movie.create({ owner, ...req.body })
    .then((movie) => res.status(201).send(movie))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные при создании фильма'));
      } else {
        next(error);
      }
    });
};

const getMovie = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.send(movies))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  return Movie.findById(movieId)
    .orFail(() => new NotFound('NotFound'))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        return next(new Forbidden('Удаление невозможно'));
      }
      return Movie.findByIdAndRemove(movieId).then(() => res.send(movie));
    })
    .catch(next);
};

module.exports = {
  createMovie,
  deleteMovie,
  getMovie,
};
