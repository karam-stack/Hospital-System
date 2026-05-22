const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({
            error: 'لم يتم العثور على توكن، يرجى تسجيل الدخول.'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

      
        req.user = {
        userId: decoded.userId,
        roleId: decoded.roleId};

        next();
    } catch (error) {
        return res.status(401).json({
            error: 'التوكن غير صالح أو منتهي.'
        });
    }
};

module.exports = authenticate;