const { sql } = require('../config/db');





const getAll = async (req, res) => {
    try {

        const result = await sql.query`
            SELECT * FROM Roles
            ORDER BY RoleID ASC
        `;
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('Get All Roles Error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};






const getById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid Role ID' });
        }

        const result = await sql.query`
            SELECT * FROM Roles
            WHERE RoleID = ${id}
        `;

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Role not found' });
        }

        res.status(200).json(result.recordset[0]);
    } catch (err) {
        console.error('Get Role By ID Error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};




const create = async (req, res) => {
    try {
        const { RoleName } = req.body;
       

        const exists = await sql.query`
            SELECT * FROM Roles
            WHERE RoleName = ${RoleName}
        `;

        if (exists.recordset.length > 0) {
            return res.status(409).json({ message: 'Role already exists' });
        }

        const result = await sql.query`
            INSERT INTO Roles (RoleName)
            OUTPUT INSERTED.*
            VALUES (${RoleName})
        `;

        res.status(201).json({
            message: 'Role created successfully',
            data: result.recordset[0]
        });
    } catch (err) {
        console.error('Create Role Error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};



const update = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid Role ID' });
        }

        const { RoleName } = req.body;
        if (!RoleName) {
            return res.status(400).json({ message: 'RoleName is required' });
        }

        const result = await sql.query`
            UPDATE Roles
            SET RoleName = ${RoleName}
            OUTPUT INSERTED.*
            WHERE RoleID = ${id}
        `;

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Role not found' });
        }

        res.status(200).json({
            message: 'Role updated successfully',
            data: result.recordset[0]
        });
    } catch (err) {
        console.error('Update Role Error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};



const remove = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid Role ID' });
        }

        const result = await sql.query`
            DELETE FROM Roles WHERE RoleID = ${id};
            SELECT @@ROWCOUNT AS RowsAffected;
        `;

        if (result.recordset[0].RowsAffected === 0) {
            return res.status(404).json({ message: 'Role not found' });
        }

        res.status(200).json({ message: 'Role deleted successfully' });
    } catch (err) {
        console.error('Delete Role Error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};





module.exports = { getAll, getById, create, update, remove };