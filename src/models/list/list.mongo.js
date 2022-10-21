const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const listSchema = new mongoose.Schema({
    listId: {
        type: String,
        required: true,
    },
    listName: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    items: [mongoose.Schema.Types.Mixed],
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model('List', listSchema);
