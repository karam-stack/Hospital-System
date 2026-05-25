const express = require('express');
const router = express.Router();

const controller = require('../controllers/rolesController');
const authenticate = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/authorizeRoles');
const ROLES = require('../config/roles');

router.use(authenticate);

// READ
router.get('/', authorizeRoles(ROLES.ADMIN), controller.getAll);
router.get('/:id', authorizeRoles(ROLES.ADMIN), controller.getById);

// WRITE
router.post('/', authorizeRoles(ROLES.ADMIN), controller.create);
router.put('/:id', authorizeRoles(ROLES.ADMIN), controller.update);

// DELETE
router.delete('/:id', authorizeRoles(ROLES.ADMIN), controller.remove);

module.exports = router;