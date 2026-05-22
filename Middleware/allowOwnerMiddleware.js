const ROLES = require('../config/roles');

const allowOwnerOrAdmin = (getOwnerId) => {
    return (req, res, next) => {

        if (!req.user) {
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }

        // Admin bypass
        if (req.user.roleId === ROLES.ADMIN) {
            return next();
        }

        const ownerId = getOwnerId(req);

        if (req.user.userId === ownerId) {
            return next();
        }

        return res.status(403).json({
            message: 'Forbidden: You can only access your own data.'
        });
    };
};

module.exports = allowOwnerOrAdmin;