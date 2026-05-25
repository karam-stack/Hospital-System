const express = require('express');
const router = express.Router();

const controller = require('../controllers/prescriptionsController');
const authenticate = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/authorizeRoles');
const ROLES = require('../config/roles');
const validate = require('../middleware/validate');
const prescriptionSchema = require('../validations/prescriptionValidation');

router.use(authenticate);

// READ (Admin + Doctor)
router.get('/', authorizeRoles(ROLES.ADMIN, ROLES.DOCTOR), controller.getAll);
router.get('/:id', authorizeRoles(ROLES.ADMIN, ROLES.DOCTOR), controller.getById);

// WRITE (Admin + Doctor)
router.post(
    '/',
    authorizeRoles(ROLES.ADMIN, ROLES.DOCTOR),
    validate(prescriptionSchema),
    controller.create
);
router.put(
    '/:id',
    authorizeRoles(ROLES.ADMIN, ROLES.DOCTOR),
    validate(prescriptionSchema),
    controller.update
);

// DELETE (Admin only)
router.delete('/:id', authorizeRoles(ROLES.ADMIN), controller.remove);

module.exports = router;