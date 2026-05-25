const express = require('express');
const router = express.Router();

const controller = require('../controllers/appointmentsController');
const authenticate = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/authorizeRoles');
const ROLES = require('../config/roles');
const validate = require('../middleware/validate');
const appointmentSchema = require('../validations/appointmentValidation');



router.use(authenticate);

// READ (Admin + Doctor + Employee)
router.get('/', authorizeRoles(ROLES.ADMIN, ROLES.DOCTOR, ROLES.EMPLOYEE), controller.getAll);
router.get('/:id', authorizeRoles(ROLES.ADMIN, ROLES.DOCTOR, ROLES.EMPLOYEE), controller.getById);

// CREATE / UPDATE (Admin + Employee)
router.post(
    '/',
    authorizeRoles(ROLES.ADMIN, ROLES.EMPLOYEE),
    validate(appointmentSchema),
    controller.create
);

router.put(
    '/:id',
    authorizeRoles(ROLES.ADMIN, ROLES.EMPLOYEE),
    validate(appointmentSchema),
    controller.update
);
// DELETE (Admin only)
router.delete('/:id', authorizeRoles(ROLES.ADMIN), controller.remove);

module.exports = router;