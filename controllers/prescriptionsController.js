const { sql } = require('../config/db');




const getAll = async (req, res) => {
    try {

        const result = await sql.query`
            SELECT * FROM Prescriptions
            ORDER BY PrescriptionID DESC
        `;
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('Get All Prescriptions Error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};



const getById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid Prescription ID' });
        }

        const result = await sql.query`
            SELECT * FROM Prescriptions
            WHERE PrescriptionID = ${id}
        `;

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Prescription not found' });
        }

        res.status(200).json(result.recordset[0]);
    } catch (err) {
        console.error('Get Prescription By ID Error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};



const create = async (req, res) => {
    try {
        const { RecordID, Medication, Dosage, Notes } = req.body;

        if (!RecordID || !Medication || !Dosage) {
            return res.status(400).json({
                message: 'RecordID, Medication and Dosage are required'
            });
        }

        const result = await sql.query`
            INSERT INTO Prescriptions (RecordID, Medication, Dosage, Notes)
            OUTPUT INSERTED.*
            VALUES (${RecordID}, ${Medication}, ${Dosage}, ${Notes})
        `;

        res.status(201).json({
            message: 'Prescription created successfully',
            data: result.recordset[0]
        });
    } catch (err) {
        console.error('Create Prescription Error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const update = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid Prescription ID' });
        }

        const { Medication, Dosage, Notes } = req.body;
        if (!Medication || !Dosage) {
            return res.status(400).json({ message: 'Medication and Dosage are required' });
        }

     
        const result = await sql.query`
            UPDATE Prescriptions
            SET Medication = ${Medication}, Dosage = ${Dosage}, Notes = ${Notes}
            OUTPUT INSERTED.*
            WHERE PrescriptionID = ${id}
        `;

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Prescription not found' });
        }

        res.status(200).json({
            message: 'Prescription updated successfully',
            data: result.recordset[0]
        });
    } catch (err) {
        console.error('Update Prescription Error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};



const remove = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid Prescription ID' });
        }


        const result = await sql.query`
            DELETE FROM Prescriptions WHERE PrescriptionID = ${id};
            SELECT @@ROWCOUNT AS RowsAffected;
        `;

        if (result.recordset[0].RowsAffected === 0) {
            return res.status(404).json({ message: 'Prescription not found' });
        }

        res.status(200).json({ message: 'Prescription deleted successfully' });
    } catch (err) {
        console.error('Delete Prescription Error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getAll, getById, create, update, remove };