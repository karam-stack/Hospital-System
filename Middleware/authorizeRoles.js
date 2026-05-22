const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {

        if (!req.user) {
            return res.status(401).json({
                message: 'Unauthorized. Please log in.'
            });
        }

        if (!allowedRoles.includes(req.user.roleId)) {
            return res.status(403).json({
                message: 'Forbidden: You do not have permission.'
            });
        }

        next();
    };
};

module.exports = authorizeRoles;