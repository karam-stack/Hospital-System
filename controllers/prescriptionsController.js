const { sql } = require('../config/db');

// GET ALL
const getAll = async (req, res) => {
    try {
        const result = await sql.query(`
            SELECT * FROM Prescriptions
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
            SELECT * FROM Prescriptions
            WHERE PrescriptionID = ${id}
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
            Medication,
            Dosage,
            Notes
        } = req.body;

        await sql.query`
            INSERT INTO Prescriptions
            (
                RecordID,
                Medication,
                Dosage,
                Notes
            )
            VALUES
            (
                ${RecordID},
                ${Medication},
                ${Dosage},
                ${Notes}
            )
        `;

        res.send('Prescription created successfully');

    } catch (err) {
        res.status(500).send(err.message);
    }
};

// UPDATE
const update = async (req, res) => {
    try {
        const id = req.params.id;

        const {
            Medication,
            Dosage,
            Notes
        } = req.body;

        await sql.query`
            UPDATE Prescriptions
            SET
                Medication = ${Medication},
                Dosage = ${Dosage},
                Notes = ${Notes}
            WHERE PrescriptionID = ${id}
        `;

        res.send('Prescription updated successfully');

    } catch (err) {
        res.status(500).send(err.message);
    }
};

// DELETE
const remove = async (req, res) => {
    try {
        const id = req.params.id;

        await sql.query`
            DELETE FROM Prescriptions
            WHERE PrescriptionID = ${id}
        `;

        res.send('Prescription deleted successfully');

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