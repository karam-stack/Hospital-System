const express = require('express');
const router = express.Router();

const controller = require('../controllers/usersController');

const authenticate = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/authorizeRoles');
const allowOwnerOrAdmin = require('../middleware/allowOwnerMiddleware');

const ROLES = require('../config/roles');
const validate = require('../middleware/validate');

const {
    createUserSchema,
    updateUserSchema
} = require('../validations/userValidation');

router.use(authenticate);

// ADMIN ONLY
router.get('/', authorizeRoles(ROLES.ADMIN), controller.getAll);

router.post(
    '/',
    authorizeRoles(ROLES.ADMIN),
    validate(createUserSchema),
    controller.createUser
);

router.delete(
    '/:id',
    authorizeRoles(ROLES.ADMIN),
    controller.remove
);

// OWNER OR ADMIN (تم التصحيح هنا)
router.get('/:id', allowOwnerOrAdmin((req) => req.params.id), controller.getById);

router.put(
    '/:id',
    allowOwnerOrAdmin((req) => req.params.id),
    validate(updateUserSchema),
    controller.update
);

module.exports = router;