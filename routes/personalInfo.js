const express = require('express');

const router = express.Router();

const controller = require('../controllers/personalInfoController');

// GET ALL
router.get('/', controller.getAll);

// GET BY ID
router.get('/:id', controller.getById);

// CREATE
router.post('/', controller.create);

// UPDATE
router.put('/:id', controller.update);

// DELETE
router.delete('/:id', controller.remove);

module.exports = router;