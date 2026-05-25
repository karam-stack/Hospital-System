const express = require('express');
const router = express.Router();

const controller = require('../controllers/personalInfoController');
const authenticate = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/authorizeRoles');
const allowOwnerOrAdmin = require('../middleware/allowOwnerMiddleware');
const ROLES = require('../config/roles');
const validate = require('../middleware/validate');
const personalInfoSchema = require('../validations/personalInfoValidation');

router.use(authenticate);

router.get(
    '/',
    authorizeRoles(ROLES.ADMIN, ROLES.DOCTOR, ROLES.EMPLOYEE),
    controller.getAll
);

router.post(
    '/',
    authorizeRoles(ROLES.ADMIN, ROLES.EMPLOYEE),
    validate(personalInfoSchema),
    controller.create
);

router.get(
    '/:id',
    authorizeRoles(ROLES.ADMIN, ROLES.DOCTOR, ROLES.EMPLOYEE),
    allowOwnerOrAdmin((req) => req.params.id),
    controller.getById
);

router.put(
    '/:id',
    authorizeRoles(ROLES.ADMIN, ROLES.EMPLOYEE),
    allowOwnerOrAdmin((req) => req.params.id),
    validate(personalInfoSchema),
    controller.update
);

router.delete(
    '/:id',
    authorizeRoles(ROLES.ADMIN),
    controller.remove
);
module.exports = router;