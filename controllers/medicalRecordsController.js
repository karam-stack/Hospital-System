const { sql } = require('../config/db');



const getAll = async (req, res) => {
    try {
        const result = await sql.query(`
            SELECT * FROM MedicalRecords
            ORDER BY RecordID DESC
        `);
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('Get All Medical Records Error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};




const getById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid Record ID' });
        }

        const result = await sql.query`
            SELECT * FROM MedicalRecords
            WHERE RecordID = ${id}
        `;

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Medical record not found' });
        }

        res.status(200).json(result.recordset[0]);
    } catch (err) {
        console.error('Get Medical Record By ID Error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const create = async (req, res) => {
    try {
        const { PatientID, DoctorID, Diagnosis, TreatmentPlan, XRayImagePath } = req.body;

        if (!PatientID || !DoctorID || !Diagnosis || !TreatmentPlan) {
            return res.status(400).json({ message: 'Required fields are missing' });
        }

        const result = await sql.query`
            INSERT INTO MedicalRecords (PatientID, DoctorID, Diagnosis, TreatmentPlan, XRayImagePath)
            OUTPUT INSERTED.*
            VALUES (${PatientID}, ${DoctorID}, ${Diagnosis}, ${TreatmentPlan}, ${XRayImagePath})
        `;

        res.status(201).json({
            message: 'Medical record created successfully',
            data: result.recordset[0]
        });
    } catch (err) {
        console.error('Create Medical Record Error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};



const update = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid Record ID' });
        }

        const { PatientID, DoctorID, Diagnosis, TreatmentPlan, XRayImagePath } = req.body;

        if (!PatientID || !DoctorID || !Diagnosis || !TreatmentPlan) {
            return res.status(400).json({ message: 'Required fields are missing' });
        }

   
        const result = await sql.query`
            UPDATE MedicalRecords
            SET
                PatientID = ${PatientID},
                DoctorID = ${DoctorID},
                Diagnosis = ${Diagnosis},
                TreatmentPlan = ${TreatmentPlan},
                XRayImagePath = ${XRayImagePath},
                UpdatedAt = GETDATE()
            OUTPUT INSERTED.*
            WHERE RecordID = ${id}
        `;

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Medical record not found' });
        }

        res.status(200).json({
            message: 'Medical record updated successfully',
            data: result.recordset[0]
        });
    } catch (err) {
        console.error('Update Medical Record Error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const remove = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid Record ID' });
        }

        const result = await sql.query`
            DELETE FROM MedicalRecords WHERE RecordID = ${id};
            SELECT @@ROWCOUNT AS RowsAffected;
        `;

        if (result.recordset[0].RowsAffected === 0) {
            return res.status(404).json({ message: 'Medical record not found' });
        }

        res.status(200).json({ message: 'Medical record deleted successfully' });
    } catch (err) {
        console.error('Delete Medical Record Error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getAll, getById, create, update, remove };