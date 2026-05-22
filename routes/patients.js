const express = require('express');
const router = express.Router();

const controller = require('../controllers/patientsController');
const authenticate = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/authorizeRoles');
const ROLES = require('../config/roles');

router.use(authenticate);

// READ (Admin + Doctor + Employee)
router.get('/', authorizeRoles(ROLES.ADMIN, ROLES.DOCTOR, ROLES.EMPLOYEE), controller.getAll);
router.get('/:id', authorizeRoles(ROLES.ADMIN, ROLES.DOCTOR, ROLES.EMPLOYEE), controller.getById);

// CREATE / UPDATE (Admin + Employee)
router.post('/', authorizeRoles(ROLES.ADMIN, ROLES.EMPLOYEE), controller.create);
router.put('/:id', authorizeRoles(ROLES.ADMIN, ROLES.EMPLOYEE), controller.update);

// DELETE (Admin only)
router.delete('/:id', authorizeRoles(ROLES.ADMIN), controller.remove);

module.exports = router;