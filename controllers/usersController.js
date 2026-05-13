const { sql } = require('../config/db');

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

const create = async (req, res) => {
    try {
        const {
            Username,
            PasswordHash,
            RoleID
        } = req.body;

        await sql.query`
            INSERT INTO Users
            (Username, PasswordHash, RoleID)
            VALUES
            (${Username}, ${PasswordHash}, ${RoleID})
        `;

        res.send('User created');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const update = async (req, res) => {
    try {
        const {
            Username,
            PasswordHash,
            RoleID,
            IsActive
        } = req.body;

        await sql.query`
            UPDATE Users
            SET
                Username = ${Username},
                PasswordHash = ${PasswordHash},
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
    create,
    update,
    remove
};