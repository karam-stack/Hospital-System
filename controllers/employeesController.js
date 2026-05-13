const { sql } = require('../config/db');

// GET ALL
const getAll = async (req, res) => {
    try {
        const result = await sql.query('SELECT * FROM Employees');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// GET BY ID
const getById = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await sql.query`
            SELECT * FROM Employees
            WHERE EmployeeID = ${id}
        `;

        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// CREATE
const create = async (req, res) => {
    try {
        const { UserID, Position, HireDate } = req.body;

        await sql.query`
            INSERT INTO Employees(UserID, Position, HireDate)
            VALUES(${UserID}, ${Position}, ${HireDate})
        `;

        res.send('Employee created');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// UPDATE
const update = async (req, res) => {
    try {
        const id = req.params.id;

        const { Position, HireDate } = req.body;

        await sql.query`
            UPDATE Employees
            SET Position = ${Position},
                HireDate = ${HireDate}
            WHERE EmployeeID = ${id}
        `;

        res.send('Employee updated');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// DELETE
const remove = async (req, res) => {
    try {
        const id = req.params.id;

        await sql.query`
            DELETE FROM Employees
            WHERE EmployeeID = ${id}
        `;

        res.send('Employee deleted');
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