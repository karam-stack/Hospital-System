const express = require('express');
const router = express.Router();

const controller = require('../controllers/employeesController');

const authenticate = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/authorizeRoles');

const ROLES = require('../config/roles');

const validate = require('../middleware/validate');

const {
    createEmployeeSchema,
    updateEmployeeSchema
} = require('../validations/employeValidation');

router.use(authenticate, authorizeRoles(ROLES.ADMIN));

router.get('/', controller.getAll);

router.get('/:id', controller.getById);

router.post(
    '/',
    validate(createEmployeeSchema),
    controller.create
);

router.put(
    '/:id',
    validate(updateEmployeeSchema),
    controller.update
);

router.delete('/:id', controller.remove);

module.exports = router;