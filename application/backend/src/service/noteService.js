const Note = require('../models/note');

const getall = () => Note.find().sort({ createdAt: -1 });

const create = (message) => Note.create({ message });

const remove = (id) => Note.findByIdAndDelete(id);

module.exports = {
    getall,
    create,
    remove
};

