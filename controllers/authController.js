const { sql } = require('../config/db');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {

    try {

        const { Username, Password } = req.body;

        // البحث عن المستخدم
        const result = await sql.query`
            SELECT *
            FROM Users
            WHERE Username = ${Username}
        `;

        // إذا المستخدم غير موجود
        if (result.recordset.length === 0) {
            return res.status(401).json({
                message: 'Invalid username'
            });
        }

        const user = result.recordset[0];

        // مقارنة كلمة المرور
        const validPassword = await bcrypt.compare(
            Password,
            user.PasswordHash
        );

        if (!validPassword) {
            return res.status(401).json({
                message: 'Invalid password'
            });
        }

        // إنشاء JWT
        const token = jwt.sign(
            {
                userId: user.UserID,
                roleId: user.RoleID
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            }
        );

        // تخزين token داخل cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax'
        });

        res.status(200).json({
            message: 'Login successful',
            token,
            user
        });

    } catch (err) {

        res.status(500).send(err.message);
    }
};

module.exports = {
    login
};