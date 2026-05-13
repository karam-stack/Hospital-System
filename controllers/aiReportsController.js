const { sql } = require('../config/db');

// GET ALL
const getAll = async (req, res) => {
    try {
        const result = await sql.query(`
            SELECT * FROM AIReports
        `);

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
            SELECT * FROM AIReports
            WHERE ReportID = ${id}
        `;

        res.json(result.recordset[0]);

    } catch (err) {
        res.status(500).send(err.message);
    }
};

// CREATE
const create = async (req, res) => {
    try {
        const {
            RecordID,
            ReportText
        } = req.body;

        await sql.query`
            INSERT INTO AIReports
            (
                RecordID,
                ReportText
            )
            VALUES
            (
                ${RecordID},
                ${ReportText}
            )
        `;

        res.send('AI report created successfully');

    } catch (err) {
        res.status(500).send(err.message);
    }
};

// UPDATE
const update = async (req, res) => {
    try {
        const id = req.params.id;

        const {
            ReportText
        } = req.body;

        await sql.query`
            UPDATE AIReports
            SET
                ReportText = ${ReportText}
            WHERE ReportID = ${id}
        `;

        res.send('AI report updated successfully');

    } catch (err) {
        res.status(500).send(err.message);
    }
};

// DELETE
const remove = async (req, res) => {
    try {
        const id = req.params.id;

        await sql.query`
            DELETE FROM AIReports
            WHERE ReportID = ${id}
        `;

        res.send('AI report deleted successfully');

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