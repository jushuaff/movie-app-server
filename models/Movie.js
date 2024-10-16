const mongoose = require('mongoose');
// Personally I like adding dateAdded or dateCreated hihi

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is Required']
    },
    director: {
        type: String,
        required: [true, 'Director is Required']
    },
    year: {
        type: Number,
        required: [true, 'Year is Required']
    },
    description: {
        type: String,
        required: [true, 'Description is Required']
    },
    genre: {
        type: String,
        required: [true, 'Genre is Required']
    },
    comments: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: [true, 'User ID is required']
            },
            comment: {
                type: String,
                required: [true, 'Comment is required']
            },
            dateAdded: {
                type: Date,
                default: Date.now
            }
        }
    ],
    dateAdded: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Movie', movieSchema);