const { sql } = require('../config/db');


// ==========================
// GET ALL PATIENTS
// ==========================
const getAll = async (req, res) => {
    try {
        const result = await sql.query(`
            SELECT * FROM Patients
            ORDER BY PatientID DESC
        `);

        res.status(200).json(result.recordset);

    } catch (err) {
        console.error('Get All Patients Error:', err);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
};


// ==========================
// GET PATIENT BY ID
// ==========================
const getById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                message: 'Invalid Patient ID'
            });
        }

        const result = await sql.query`
            SELECT * FROM Patients
            WHERE PatientID = ${id}
        `;

        if (result.recordset.length === 0) {
            return res.status(404).json({
                message: 'Patient not found'
            });
        }

        res.status(200).json(result.recordset[0]);

    } catch (err) {
        console.error('Get Patient By ID Error:', err);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
};



const create = async (req, res) => {
    try {
        const { UserID, BloodType } = req.body;

        // Validation
        if (!UserID || !BloodType) {
            return res.status(400).json({
                message: 'UserID and BloodType are required'
            });
        }

        const result = await sql.query`
            INSERT INTO Patients
            (
                UserID,
                BloodType
            )
            OUTPUT INSERTED.*
            VALUES
            (
                ${UserID},
                ${BloodType}
            )
        `;

        res.status(201).json({
            message: 'Patient created successfully',
            data: result.recordset[0]
        });

    } catch (err) {
        console.error('Create Patient Error:', err);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
};



const update = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                message: 'Invalid Patient ID'
            });
        }

        const { BloodType } = req.body;

        if (!BloodType) {
            return res.status(400).json({
                message: 'BloodType is required'
            });
        }

      
        const result = await sql.query`
            UPDATE Patients
            SET BloodType = ${BloodType}
            OUTPUT INSERTED.*
            WHERE PatientID = ${id}
        `;

    
        if (result.recordset.length === 0) {
            return res.status(404).json({
                message: 'Patient not found'
            });
        }

        res.status(200).json({
            message: 'Patient updated successfully',
            data: result.recordset[0]
        });

    } catch (err) {
        console.error('Update Patient Error:', err);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
};



const remove = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                message: 'Invalid Patient ID'
            });
        }

      
        const result = await sql.query`
            DELETE FROM Patients WHERE PatientID = ${id};
            SELECT @@ROWCOUNT AS RowsAffected;
        `;

        if (result.recordset[0].RowsAffected === 0) {
            return res.status(404).json({
                message: 'Patient not found'
            });
        }

        res.status(200).json({
            message: 'Patient deleted successfully'
        });

    } catch (err) {
        console.error('Delete Patient Error:', err);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
};


module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};