const express = require('express');
const router = express.Router();

const controller = require('../controllers/personalInfoController');
const authenticate = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/authorizeRoles');
const allowOwnerOrAdmin = require('../middleware/allowOwnerMiddleware');
const ROLES = require('../config/roles');

router.use(authenticate);

// ADMIN + STAFF
router.get('/', authorizeRoles(ROLES.ADMIN, ROLES.DOCTOR, ROLES.EMPLOYEE), controller.getAll);

// Admin + Employee create
router.post('/', authorizeRoles(ROLES.ADMIN, ROLES.EMPLOYEE), controller.create);

// Owner or Admin access
router.get('/:id', allowOwnerOrAdmin(), controller.getById);
router.put('/:id', allowOwnerOrAdmin(), controller.update);

// Admin only
router.delete('/:id', authorizeRoles(ROLES.ADMIN), controller.remove);

module.exports = router;