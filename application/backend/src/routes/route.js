const express = require("express");

const {
  getall,
  createNote,
  deleteNote,
} = require("../controllers/noteController");

const router = express.Router();

router.route("/")
  .get(getall)
  .post(createNote);

router.route("/:id")
  .delete(deleteNote);

module.exports = router;