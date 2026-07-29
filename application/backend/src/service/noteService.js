const Note = require("../models/Note");

const getall = async () => {
  return await Note.find().sort({ createdAt: -1 });
};

const create = async (message) => {
  return await Note.create({ message });
};

const remove = async (id) => {
  return await Note.findByIdAndDelete(id);
};

module.exports = {
  getall,
  create,
  remove,
};