const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const watchableSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    poster: {
        type: String,
    },
    country: {
        type: String,
        required: true,
    },
    seasons: {
        type: Number,
    },
    imdbRating: {
        type: Number,
    },
});

module.exports = mongoose.model('Watchable', watchableSchema);
