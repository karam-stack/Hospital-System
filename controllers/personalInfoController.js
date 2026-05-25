const { sql } = require('../config/db');




const getAll = async (req, res) => {

    try {

        const result = await sql.query(`
            SELECT * FROM PersonalInfo
            ORDER BY PersonalInfoID DESC
        `);

        res.status(200).json(result.recordset);

    } catch (err) {

        console.error('Get All Personal Info Error:', err);

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
                message: 'Invalid PersonalInfo ID'
            });
        }

        const result = await sql.query`
            SELECT * FROM PersonalInfo
            WHERE PersonalInfoID = ${id}
        `;

        if (result.recordset.length === 0) {
            return res.status(404).json({
                message: 'Personal info not found'
            });
        }

        res.status(200).json(result.recordset[0]);

    } catch (err) {

        console.error('Get Personal Info By ID Error:', err);

        res.status(500).json({
            message: 'Internal server error'
        });
    }
};




const create = async (req, res) => {

    try {

        const {
            UserID,
            FullName,
            Email,
            Address,
            DateOfBirth,
            Gender
        } = req.body;

    
        
        const result = await sql.query`
            INSERT INTO PersonalInfo
            (
                UserID,
                FullName,
                Email,
                Address,
                DateOfBirth,
                Gender
            )
            OUTPUT INSERTED.*
            VALUES
            (
                ${UserID},
                ${FullName},
                ${Email},
                ${Address},
                ${DateOfBirth},
                ${Gender}
            )
        `;

        res.status(201).json({
            message: 'Personal info created successfully',
            data: result.recordset[0]
        });

    } catch (err) {

        console.error('Create Personal Info Error:', err);

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
                message: 'Invalid PersonalInfo ID'
            });
        }

        const {
            FullName,
            Email,
            Address,
            DateOfBirth,
            Gender
        } = req.body;

        if (
            !FullName ||
            !Email ||
            !DateOfBirth ||
            !Gender
        ) {
            return res.status(400).json({
                message: 'Required fields are missing'
            });
        }

      
        const check = await sql.query`
            SELECT * FROM PersonalInfo
            WHERE PersonalInfoID = ${id}
        `;

        if (check.recordset.length === 0) {
            return res.status(404).json({
                message: 'Personal info not found'
            });
        }

        await sql.query`
            UPDATE PersonalInfo
            SET
                FullName = ${FullName},
                Email = ${Email},
                Address = ${Address},
                DateOfBirth = ${DateOfBirth},
                Gender = ${Gender}
            WHERE PersonalInfoID = ${id}
        `;

        res.status(200).json({
            message: 'Personal info updated successfully'
        });

    } catch (err) {

        console.error('Update Personal Info Error:', err);

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
                message: 'Invalid PersonalInfo ID'
            });
        }

       
        const check = await sql.query`
            SELECT * FROM PersonalInfo
            WHERE PersonalInfoID = ${id}
        `;

        if (check.recordset.length === 0) {
            return res.status(404).json({
                message: 'Personal info not found'
            });
        }

        await sql.query`
            DELETE FROM PersonalInfo
            WHERE PersonalInfoID = ${id}
        `;

        res.status(200).json({
            message: 'Personal info deleted successfully'
        });

    } catch (err) {

        console.error('Delete Personal Info Error:', err);

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