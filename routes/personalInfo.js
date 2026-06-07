const express = require('express');
const router = express.Router();

const controller = require('../controllers/personalInfoController');

const authenticate = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/authorizeRoles');
const allowOwnerOrAdmin = require('../middleware/allowOwnerMiddleware');

const ROLES = require('../config/roles');
const validate = require('../middleware/validate');

const {
    createPersonalInfoSchema,
    updatePersonalInfoSchema
} = require('../validations/personalInfoValidation');

router.use(authenticate);

// READ ALL
router.get(
    '/',
    authorizeRoles(ROLES.ADMIN, ROLES.DOCTOR, ROLES.EMPLOYEE),
    controller.getAll
);

// CREATE
router.post(
    '/',
    authorizeRoles(ROLES.ADMIN, ROLES.EMPLOYEE),
    validate(createPersonalInfoSchema),
    controller.create
);

// OWNER OR ADMIN (تم التصحيح هنا)
router.get(
    '/:id',
    allowOwnerOrAdmin((req) => req.params.id),
    controller.getById
);

router.put(
    '/:id',
    allowOwnerOrAdmin((req) => req.params.id),
    validate(updatePersonalInfoSchema),
    controller.update
);

// DELETE
router.delete(
    '/:id',
    authorizeRoles(ROLES.ADMIN),
    controller.remove
);

module.exports = router;