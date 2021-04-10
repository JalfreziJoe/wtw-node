const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.types.ObjectId;

const watchList = new Schema({
    watchable: {
        type: ObjectId,
        ref: 'Watchable',
    },
    owner: {
        type: ObjectId,
        required: true,
        refPath: 'onModel',
    },
    onModel: {
        type: String,
        required: true,
        enum: ['User', 'Group'],
    },
    status: {
        type: String,
        enum: ['watched', 'watching', 'wantToWatch'],
        default: 'wantToWatch',
    },
    starReview: {
        type: Number,
        min: 0,
        max: 5,
    },
    comments: String,
});

module.exports = mongoose.model('WatchList', watchList);
