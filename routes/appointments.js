const express = require('express');
const router = express.Router();

const controller = require('../controllers/appointmentsController');
const authenticate = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/authorizeRoles');
const ROLES = require('../config/roles');

const validate = require('../middleware/validate');

const {
    createAppointmentSchema,
    updateAppointmentSchema
} = require('../validations/appointmentValidation');

router.use(authenticate);

// READ
router.get(
    '/',
    authorizeRoles(ROLES.ADMIN, ROLES.DOCTOR, ROLES.EMPLOYEE),
    controller.getAll
);

router.get(
    '/:id',
    authorizeRoles(ROLES.ADMIN, ROLES.DOCTOR, ROLES.EMPLOYEE),
    controller.getById
);

// WRITE
router.post(
    '/',
    authorizeRoles(ROLES.ADMIN, ROLES.EMPLOYEE),
    validate(createAppointmentSchema),
    controller.create
);

router.put(
    '/:id',
    authorizeRoles(ROLES.ADMIN, ROLES.EMPLOYEE),
    validate(updateAppointmentSchema),
    controller.update
);

// DELETE
router.delete(
    '/:id',
    authorizeRoles(ROLES.ADMIN),
    controller.remove
);

module.exports = router;