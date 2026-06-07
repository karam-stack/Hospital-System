const { sql, getPool } = require('../config/db');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        const { Username, Password } = req.body;

        if (!Username || !Password) {
            return res.status(400).json({
                message: 'Username and password are required'
            });
        }

        const pool = getPool();

        const result = await pool.request()
            .input('Username', sql.NVarChar, Username)
            .query(`
                SELECT TOP 1 *
                FROM Users
                WHERE Username = @Username
            `);

        if (result.recordset.length === 0) {
            return res.status(401).json({
                message: 'Invalid username or password'
            });
        }

        const user = result.recordset[0];

        if (!user.IsActive) {
            return res.status(403).json({
                message: 'Account disabled'
            });
        }

        // 🔥 TEMP FIX (بدون bcrypt للتجربة)
        const validPassword = Password === user.PasswordHash;

        if (!validPassword) {
            return res.status(401).json({
                message: 'Invalid username or password'
            });
        }

        const token = jwt.sign(
            {
                userId: user.UserID,
                roleId: user.RoleID
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            message: 'Login successful',
            user: {
                UserID: user.UserID,
                Username: user.Username,
                RoleID: user.RoleID
            }
        });

    } catch (err) {
        console.log("🔥 LOGIN ERROR:", err);
        return res.status(500).json({
            error: err.message
        });
    }
};

const logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production'
    });

    return res.status(200).json({
        message: 'Logout successful'
    });
};

module.exports = {
    login,
    logout
};