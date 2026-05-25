const { sql } = require('../config/db');

// GET ALL APPOINTMENTS
const getAll = async (req, res) => {
    try {
        const result = await sql.query(`
            SELECT * FROM Appointments
            ORDER BY AppointmentID DESC
        `);
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('Get All Appointments Error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};



const getById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid Appointment ID' });
        }

        const result = await sql.query`
            SELECT * FROM Appointments
            WHERE AppointmentID = ${id}
        `;

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.status(200).json(result.recordset[0]);
    } catch (err) {
        console.error('Get Appointment By ID Error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};



const create = async (req, res) => {
    try {
        const { PatientID, DoctorID, AppointmentDate, Status } = req.body;

      

        const result = await sql.query`
            INSERT INTO Appointments (PatientID, DoctorID, AppointmentDate, Status)
            OUTPUT INSERTED.*
            VALUES (${PatientID}, ${DoctorID}, ${AppointmentDate}, ${Status})
        `;

        res.status(201).json({
            message: 'Appointment created successfully',
            data: result.recordset[0]
        });
    } catch (err) {
        console.error('Create Appointment Error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};



const update = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { PatientID, DoctorID, AppointmentDate, Status } = req.body;

        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid Appointment ID' });
        }
        if (!PatientID || !DoctorID || !AppointmentDate || !Status) {
            return res.status(400).json({ message: 'All fields are required' });
        }

  
        const result = await sql.query`
            UPDATE Appointments
            SET
                PatientID = ${PatientID},
                DoctorID = ${DoctorID},
                AppointmentDate = ${AppointmentDate},
                Status = ${Status}
            OUTPUT INSERTED.*
            WHERE AppointmentID = ${id}
        `;

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.status(200).json({
            message: 'Appointment updated successfully',
            data: result.recordset[0]
        });
    } catch (err) {
        console.error('Update Appointment Error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};



const remove = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid Appointment ID' });
        }


        const result = await sql.query`
            DELETE FROM Appointments WHERE AppointmentID = ${id};
            SELECT @@ROWCOUNT AS RowsAffected;
        `;

        if (result.recordset[0].RowsAffected === 0) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (err) {
        console.error('Delete Appointment Error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getAll, getById, create, update, remove };