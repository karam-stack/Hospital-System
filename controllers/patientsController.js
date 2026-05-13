const { sql } = require('../config/db');

const getAll = async (req, res) => {
    try {
        const result = await sql.query('SELECT * FROM Patients');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getById = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await sql.query`
            SELECT * FROM Patients WHERE PatientID = ${id}
        `;

        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const create = async (req, res) => {
    try {
        const { UserID, BloodType } = req.body;

        await sql.query`
            INSERT INTO Patients(UserID, BloodType)
            VALUES(${UserID}, ${BloodType})
        `;

        res.send('Patient created');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const update = async (req, res) => {
    try {
        const id = req.params.id;
        const { BloodType } = req.body;

        await sql.query`
            UPDATE Patients
            SET BloodType = ${BloodType}
            WHERE PatientID = ${id}
        `;

        res.send('Patient updated');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const remove = async (req, res) => {
    try {
        const id = req.params.id;

        await sql.query`
            DELETE FROM Patients WHERE PatientID = ${id}
        `;

        res.send('Patient deleted');
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