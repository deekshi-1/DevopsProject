const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    }
},
    {
        timestamps: true,
    }
);