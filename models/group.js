const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.types.ObjectId;

const groupSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    members: [
        {
            type: ObjectId,
            ref: 'User',
        },
    ],
});

module.exports = mongoose.model('Group', groupSchema);
