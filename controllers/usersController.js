const { sql } = require('../config/db');
const bcrypt = require('bcryptjs');



const getAll = async (req, res) => {
    try {
        const result = await sql.query('SELECT * FROM Users');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getById = async (req, res) => {
    try {
        const result = await sql.query`
            SELECT * FROM Users
            WHERE UserID = ${req.params.id}
        `;

        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const createUser = async (req, res) => {

    try {

        const { Username, Password, RoleID } = req.body;

        // تشفير كلمة المرور
        const hashedPassword = await bcrypt.hash(
            Password,
            10
        );

        await sql.query`
            INSERT INTO Users
            (Username, PasswordHash, RoleID)
            VALUES
            (
                ${Username},
                ${hashedPassword},
                ${RoleID}
            )
        `;

        res.status(201).json({
            message: 'User created successfully'
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
};

const update = async (req, res) => {

    try {

        const {
            Username,
            Password,
            RoleID,
            IsActive
        } = req.body;

        const hashedPassword = await bcrypt.hash(
            Password,
            10
        );

        await sql.query`
            UPDATE Users
            SET
                Username = ${Username},
                PasswordHash = ${hashedPassword},
                RoleID = ${RoleID},
                IsActive = ${IsActive}
            WHERE UserID = ${req.params.id}
        `;

        res.send('User updated');

    } catch (err) {

        res.status(500).send(err.message);
    }
};

const remove = async (req, res) => {
    try {
        const id = req.params.id;

     
        const result = await sql.query`
            SELECT Users.UserID, Roles.RoleName
            FROM Users
            INNER JOIN Roles
                ON Users.RoleID = Roles.RoleID
            WHERE Users.UserID = ${id}
        `;

      
        if (result.recordset.length === 0) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        const user = result.recordset[0];

       
        if (user.RoleName === 'Admin') {
            return res.status(403).json({
                message: 'Admin users cannot be deleted'
            });
        }

        
        await sql.query`
            DELETE FROM Users
            WHERE UserID = ${id}
        `;

        res.json({
            message: 'User deleted successfully'
        });

    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    getAll,
    getById,
    createUser,
    update,
    remove
};