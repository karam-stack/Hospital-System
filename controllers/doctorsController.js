const { sql } = require('../config/db');
const doctorSchema = require('../validations/doctorValidation');




const getAll = async (req, res) => {
    try {
        const result = await sql.query(`
            SELECT * FROM Doctors
            ORDER BY DoctorID DESC
        `);

        res.status(200).json(result.recordset);

    } catch (err) {
        console.error('Get All Doctors Error:', err);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
};


const getById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                message: 'Invalid Doctor ID'
            });
        }

        const result = await sql.query`
            SELECT * FROM Doctors
            WHERE DoctorID = ${id}
        `;

        if (result.recordset.length === 0) {
            return res.status(404).json({
                message: 'Doctor not found'
            });
        }

        res.status(200).json(result.recordset[0]);

    } catch (err) {
        console.error('Get Doctor By ID Error:', err);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
};




const create = async (req, res) => {
    try {
       
        const { error } = doctorSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            });
        }

        const {
            UserID,
            Specialization,
            ClinicNumber
        } = req.body;


        const exists = await sql.query`
            SELECT * FROM Doctors
            WHERE UserID = ${UserID}
        `;

        if (exists.recordset.length > 0) {
            return res.status(409).json({
                message: 'Doctor already exists for this user'
            });
        }

        const result = await sql.query`
            INSERT INTO Doctors
            (
                UserID,
                Specialization,
                ClinicNumber
            )
            OUTPUT INSERTED.*
            VALUES
            (
                ${UserID},
                ${Specialization},
                ${ClinicNumber}
            )
        `;

        res.status(201).json({
            message: 'Doctor created successfully',
            data: result.recordset[0]
        });

    } catch (err) {
        console.error('Create Doctor Error:', err);
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
                message: 'Invalid Doctor ID'
            });
        }

        const {
            Specialization,
            ClinicNumber
        } = req.body;

        if (!Specialization || !ClinicNumber) {
            return res.status(400).json({
                message: 'Specialization and ClinicNumber are required'
            });
        }

       
        const result = await sql.query`
            UPDATE Doctors
            SET
                Specialization = ${Specialization},
                ClinicNumber = ${ClinicNumber}
            OUTPUT INSERTED.*
            WHERE DoctorID = ${id}
        `;

     
        if (result.recordset.length === 0) {
            return res.status(404).json({
                message: 'Doctor not found'
            });
        }

        res.status(200).json({
            message: 'Doctor updated successfully',
            data: result.recordset[0] // الآن المتغير يحتوي على البيانات الجديدة بشكل آمن
        });

    } catch (err) {
        console.error('Update Doctor Error:', err);
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
                message: 'Invalid Doctor ID'
            });
        }

       
        const result = await sql.query`
            DELETE FROM Doctors WHERE DoctorID = ${id};
            SELECT @@ROWCOUNT AS RowsAffected;
        `;

        if (result.recordset[0].RowsAffected === 0) {
            return res.status(404).json({
                message: 'Doctor not found'
            });
        }

        res.status(200).json({
            message: 'Doctor deleted successfully'
        });

    } catch (err) {
        console.error('Delete Doctor Error:', err);
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