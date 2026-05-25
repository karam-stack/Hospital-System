const { sql } = require('../config/db');
const bcrypt = require('bcryptjs');
const userSchema = require('../validations/userValidation');



const getAll = async (req, res) => {
    try {
        const result = await sql.query`
            SELECT UserID, Username, RoleID, IsActive 
            FROM Users
            ORDER BY UserID DESC
        `;
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('Get All Users Error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};



const getById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid User ID' });
        }

        const result = await sql.query`
            SELECT UserID, Username, RoleID, IsActive 
            FROM Users
            WHERE UserID = ${id}
        `;

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(result.recordset[0]);
    } catch (err) {
        console.error('Get User By ID Error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};



const createUser = async (req, res) => {
    try {

        const { Username, Password, RoleID } = req.body;

        const exists = await sql.query`
            SELECT * FROM Users
            WHERE Username = ${Username}
        `;

        if (exists.recordset.length > 0) {
            return res.status(409).json({ message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(Password, 10);

        const result = await sql.query`
            INSERT INTO Users (Username, PasswordHash, RoleID)
            OUTPUT INSERTED.UserID, INSERTED.Username, INSERTED.RoleID, INSERTED.IsActive
            VALUES (${Username}, ${hashedPassword}, ${RoleID})
        `;

        res.status(201).json({
            message: 'User created successfully',
            data: result.recordset[0]
        });

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};


const update = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid User ID' });
        }

        const { Username, Password, RoleID, IsActive } = req.body;

        let result;
        if (Password) {
            const hashedPassword = await bcrypt.hash(Password, 10);
            result = await sql.query`
                UPDATE Users
                SET Username = ${Username}, PasswordHash = ${hashedPassword}, RoleID = ${RoleID}, IsActive = ${IsActive}
                OUTPUT INSERTED.UserID, INSERTED.Username, INSERTED.RoleID, INSERTED.IsActive
                WHERE UserID = ${id}
            `;
        } else {
            result = await sql.query`
                UPDATE Users
                SET Username = ${Username}, RoleID = ${RoleID}, IsActive = ${IsActive}
                OUTPUT INSERTED.UserID, INSERTED.Username, INSERTED.RoleID, INSERTED.IsActive
                WHERE UserID = ${id}
            `;
        }

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User updated successfully',
            data: result.recordset[0]
        });
    } catch (err) {
        console.error('Update User Error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const remove = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid User ID' });
        }

        const checkResult = await sql.query`
            SELECT Users.UserID, Roles.RoleName
            FROM Users
            INNER JOIN Roles ON Users.RoleID = Roles.RoleID
            WHERE Users.UserID = ${id}
        `;

        if (checkResult.recordset.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (checkResult.recordset[0].RoleName === 'Admin') {
            return res.status(403).json({ message: 'Admin users cannot be deleted' });
        }

        await sql.query`
            DELETE FROM Users WHERE UserID = ${id}
        `;

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error('Delete User Error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getAll, getById, createUser, update, remove };