const express = require('express');

const {getall, create, remove} = require('../service/noteService');

const router = express.Router();

router.route('/').get(getall).post(create);
router.route('/:id').delete(remove);

module.exports = router;