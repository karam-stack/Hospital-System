const express = require('express');
const router = express.Router();

const controller = require('../controllers/patientsController');

const authenticate = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/authorizeRoles');

const ROLES = require('../config/roles');

const validate = require('../middleware/validate');

const {
    createPatientSchema,
    updatePatientSchema
} = require('../validations/patientValidation');

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
    validate(createPatientSchema),
    controller.create
);

router.put(
    '/:id',
    authorizeRoles(ROLES.ADMIN, ROLES.EMPLOYEE),
    validate(updatePatientSchema),
    controller.update
);

// DELETE
router.delete(
    '/:id',
    authorizeRoles(ROLES.ADMIN),
    controller.remove
);

module.exports = router;