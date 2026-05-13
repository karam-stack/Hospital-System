const { sql } = require('../config/db');

// GET ALL
const getAll = async (req, res) => {
    try {
        const result = await sql.query(`
            SELECT * FROM MedicalRecords
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
            SELECT * FROM MedicalRecords
            WHERE RecordID = ${id}
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
            PatientID,
            DoctorID,
            Diagnosis,
            TreatmentPlan,
            XRayImagePath
        } = req.body;

        await sql.query`
            INSERT INTO MedicalRecords
            (
                PatientID,
                DoctorID,
                Diagnosis,
                TreatmentPlan,
                XRayImagePath
            )
            VALUES
            (
                ${PatientID},
                ${DoctorID},
                ${Diagnosis},
                ${TreatmentPlan},
                ${XRayImagePath}
            )
        `;

        res.send('Medical record created successfully');

    } catch (err) {
        res.status(500).send(err.message);
    }
};

// UPDATE
const update = async (req, res) => {
    try {
        const id = req.params.id;

        const {
            PatientID,
            DoctorID,
            Diagnosis,
            TreatmentPlan,
            XRayImagePath
        } = req.body;

        await sql.query`
            UPDATE MedicalRecords
            SET
                PatientID = ${PatientID},
                DoctorID = ${DoctorID},
                Diagnosis = ${Diagnosis},
                TreatmentPlan = ${TreatmentPlan},
                XRayImagePath = ${XRayImagePath},
                UpdatedAt = GETDATE()
            WHERE RecordID = ${id}
        `;

        res.send('Medical record updated successfully');

    } catch (err) {
        res.status(500).send(err.message);
    }
};

// DELETE
const remove = async (req, res) => {
    try {
        const id = req.params.id;

        await sql.query`
            DELETE FROM MedicalRecords
            WHERE RecordID = ${id}
        `;

        res.send('Medical record deleted successfully');

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