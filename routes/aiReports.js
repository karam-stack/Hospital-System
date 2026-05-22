const express = require('express');
const router = express.Router();

const controller = require('../controllers/aiReportsController');
const authenticate = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/authorizeRoles');
const ROLES = require('../config/roles');

router.use(authenticate);

// Admin + Doctor
router.get('/', authorizeRoles(ROLES.ADMIN, ROLES.DOCTOR), controller.getAll);
router.get('/:id', authorizeRoles(ROLES.ADMIN, ROLES.DOCTOR), controller.getById);
router.post('/', authorizeRoles(ROLES.ADMIN, ROLES.DOCTOR), controller.create);
router.put('/:id', authorizeRoles(ROLES.ADMIN, ROLES.DOCTOR), controller.update);

// Admin only
router.delete('/:id', authorizeRoles(ROLES.ADMIN), controller.remove);

module.exports = router;