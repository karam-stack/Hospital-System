const { sql } = require('../config/db');


const getAll = async (req, res) => {
    try {
        const result = await sql.query(`
            SELECT * FROM Employees
            ORDER BY EmployeeID DESC
        `);
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('Get All Employees Error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};




const getById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid Employee ID' });
        }

        const result = await sql.query`
            SELECT * FROM Employees
            WHERE EmployeeID = ${id}
        `;

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json(result.recordset[0]);
    } catch (err) {
        console.error('Get Employee By ID Error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const create = async (req, res) => {
    try {
        const { UserID, Position, HireDate } = req.body;

        

        const result = await sql.query`
            INSERT INTO Employees (UserID, Position, HireDate)
            OUTPUT INSERTED.*
            VALUES (${UserID}, ${Position}, ${HireDate})
        `;

        res.status(201).json({
            message: 'Employee created successfully',
            data: result.recordset[0]
        });
    } catch (err) {
        console.error('Create Employee Error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};



const update = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid Employee ID' });
        }

        const { Position, HireDate } = req.body;
        if (!Position || !HireDate) {
            return res.status(400).json({ message: 'Position and HireDate are required' });
        }

   
        const result = await sql.query`
            UPDATE Employees
            SET Position = ${Position}, HireDate = ${HireDate}
            OUTPUT INSERTED.*
            WHERE EmployeeID = ${id}
        `;

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json({
            message: 'Employee updated successfully',
            data: result.recordset[0]
        });
    } catch (err) {
        console.error('Update Employee Error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};



const remove = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid Employee ID' });
        }

     
        const result = await sql.query`
            DELETE FROM Employees WHERE EmployeeID = ${id};
            SELECT @@ROWCOUNT AS RowsAffected;
        `;

        if (result.recordset[0].RowsAffected === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (err) {
        console.error('Delete Employee Error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getAll, getById, create, update, remove };