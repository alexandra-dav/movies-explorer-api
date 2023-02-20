const { Schema, model } = require('mongoose');
const validator = require('validator');

const movieSchema = new Schema({
  country: {
    type: String,
    required: 'country не может быть пустым',
  },
  director: {
    type: String,
    required: 'director не может быть пустым',
  },
  duration: {
    type: Number,
    required: 'duration не может быть пустым',
  },
  year: {
    type: String,
    required: 'year не может быть пустым',
  },
  description: {
    type: String,
    required: 'description не может быть пустым',
  },
  image: {
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: (props) => `${props.value} - не валидное значение URL!`,
    },
    required: 'image не может быть пустым',
  },
  trailerLink: {
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: (props) => `${props.value} - не валидное значение URL!`,
    },
    required: 'trailerLink не может быть пустым',
  },
  thumbnail: {
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: (props) => `${props.value} - не валидное значение URL!`,
    },
    required: 'thumbnail не может быть пустым',
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: 'owner обязательное поле',
  },
  movieId: {
    type: Schema.Types.ObjectId,
    required: 'movieId обязательное поле',
  },
  nameRU: {
    type: String,
    required: 'nameRU не может быть пустым',
  },
  nameEN: {
    type: String,
    required: 'nameEN не может быть пустым',
  },
}, { versionKey: false });

module.exports = model('movie', movieSchema);
