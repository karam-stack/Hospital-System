const express = require('express');
const router = express.Router();

const controller = require('../controllers/medicalRecordsController');

const authenticate = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/authorizeRoles');

const ROLES = require('../config/roles');

const validate = require('../middleware/validate');

const {
    createMedicalRecordSchema,
    updateMedicalRecordSchema
} = require('../validations/medicalRecordValidation');

router.use(authenticate);

// READ
router.get(
    '/',
    authorizeRoles(ROLES.ADMIN, ROLES.DOCTOR),
    controller.getAll
);

router.get(
    '/:id',
    authorizeRoles(ROLES.ADMIN, ROLES.DOCTOR),
    controller.getById
);

// WRITE
router.post(
    '/',
    authorizeRoles(ROLES.ADMIN, ROLES.DOCTOR),
    validate(createMedicalRecordSchema),
    controller.create
);

router.put(
    '/:id',
    authorizeRoles(ROLES.ADMIN, ROLES.DOCTOR),
    validate(updateMedicalRecordSchema),
    controller.update
);

// DELETE
router.delete(
    '/:id',
    authorizeRoles(ROLES.ADMIN),
    controller.remove
);

module.exports = router;