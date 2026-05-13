const { sql } = require('../config/db');

const getAll = async (req, res) => {
    try {
        const result = await sql.query('SELECT * FROM Roles');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getById = async (req, res) => {
    try {
        const result = await sql.query`
            SELECT * FROM Roles
            WHERE RoleID = ${req.params.id}
        `;

        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const create = async (req, res) => {
    try {
        const { RoleName } = req.body;

        await sql.query`
            INSERT INTO Roles(RoleName)
            VALUES(${RoleName})
        `;

        res.send('Role created');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const update = async (req, res) => {
    try {
        const { RoleName } = req.body;

        await sql.query`
            UPDATE Roles
            SET RoleName = ${RoleName}
            WHERE RoleID = ${req.params.id}
        `;

        res.send('Role updated');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const remove = async (req, res) => {
    try {
        await sql.query`
            DELETE FROM Roles
            WHERE RoleID = ${req.params.id}
        `;

        res.send('Role deleted');
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