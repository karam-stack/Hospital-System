const express = require('express');
const router = express.Router();

const controller = require('../controllers/usersController');
const authenticate = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/authorizeRoles');
const allowOwnerOrAdmin = require('../middleware/allowOwnerMiddleware');
const ROLES = require('../config/roles');

router.use(authenticate);

// ADMIN ONLY
router.get('/', authorizeRoles(ROLES.ADMIN), controller.getAll);
router.post('/', authorizeRoles(ROLES.ADMIN), controller.createUser);
router.delete('/:id', authorizeRoles(ROLES.ADMIN), controller.remove);

// OWNER OR ADMIN
router.get('/:id', allowOwnerOrAdmin(), controller.getById);
router.put('/:id', allowOwnerOrAdmin(), controller.update);

module.exports = router;