const { sql } = require('../config/db');

// GET ALL APPOINTMENTS
const getAll = async (req, res) => {
    try {
        const result = await sql.query(`
            SELECT * FROM Appointments
        `);

        res.json(result.recordset);

    } catch (err) {
        res.status(500).send(err.message);
    }
};

// GET APPOINTMENT BY ID
const getById = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await sql.query`
            SELECT * FROM Appointments
            WHERE AppointmentID = ${id}
        `;

        res.json(result.recordset[0]);

    } catch (err) {
        res.status(500).send(err.message);
    }
};

// CREATE APPOINTMENT
const create = async (req, res) => {
    try {
        const {
            PatientID,
            DoctorID,
            AppointmentDate,
            Status
        } = req.body;

        await sql.query`
            INSERT INTO Appointments
            (
                PatientID,
                DoctorID,
                AppointmentDate,
                Status
            )
            VALUES
            (
                ${PatientID},
                ${DoctorID},
                ${AppointmentDate},
                ${Status}
            )
        `;

        res.send('Appointment created successfully');

    } catch (err) {
        res.status(500).send(err.message);
    }
};

// UPDATE APPOINTMENT
const update = async (req, res) => {
    try {
        const id = req.params.id;

        const {
            PatientID,
            DoctorID,
            AppointmentDate,
            Status
        } = req.body;

        await sql.query`
            UPDATE Appointments
            SET
                PatientID = ${PatientID},
                DoctorID = ${DoctorID},
                AppointmentDate = ${AppointmentDate},
                Status = ${Status}
            WHERE AppointmentID = ${id}
        `;

        res.send('Appointment updated successfully');

    } catch (err) {
        res.status(500).send(err.message);
    }
};

// DELETE APPOINTMENT
const remove = async (req, res) => {
    try {
        const id = req.params.id;

        await sql.query`
            DELETE FROM Appointments
            WHERE AppointmentID = ${id}
        `;

        res.send('Appointment deleted successfully');

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