const express = require('express');
const router = express.Router();

const controller = require('../controllers/doctorsController');
const authenticate = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/authorizeRoles');
const ROLES = require('../config/roles');
const validate = require('../middleware/validate');
const doctorSchema = require('../validations/doctorValidation');


router.use(authenticate);

// READ (Admin + Doctor + Employee)
router.get('/', authorizeRoles(ROLES.ADMIN, ROLES.DOCTOR, ROLES.EMPLOYEE), controller.getAll);
router.get('/:id', authorizeRoles(ROLES.ADMIN, ROLES.DOCTOR, ROLES.EMPLOYEE), controller.getById);

// WRITE (Admin only)
router.post(
    '/',
    authorizeRoles(ROLES.ADMIN),
    validate(doctorSchema),
    controller.create
);

router.put(
    '/:id',
    authorizeRoles(ROLES.ADMIN),
    validate(doctorSchema),
    controller.update
);
router.delete('/:id', authorizeRoles(ROLES.ADMIN), controller.remove);

module.exports = router;