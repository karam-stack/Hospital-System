const { sql } = require('../config/db');


const getAll = async (req, res) => {
    try {
        const result = await sql.query(`
            SELECT * FROM AIReports
            ORDER BY ReportID DESC
        `);
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('Get All AI Reports Error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const getById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid Report ID' });
        }

        const result = await sql.query`
            SELECT * FROM AIReports
            WHERE ReportID = ${id}
        `;

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'AI Report not found' });
        }

        res.status(200).json(result.recordset[0]);
    } catch (err) {
        console.error('Get AI Report By ID Error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const create = async (req, res) => {
    try {
        const { RecordID, ReportText } = req.body;

       

        const result = await sql.query`
            INSERT INTO AIReports (RecordID, ReportText)
            OUTPUT INSERTED.*
            VALUES (${RecordID}, ${ReportText})
        `;

        res.status(201).json({
            message: 'AI report created successfully',
            data: result.recordset[0]
        });
    } catch (err) {
        console.error('Create AI Report Error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const update = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { ReportText } = req.body;

        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid Report ID' });
        }
        if (!ReportText) {
            return res.status(400).json({ message: 'ReportText is required' });
        }

    
        const result = await sql.query`
            UPDATE AIReports
            SET ReportText = ${ReportText}
            OUTPUT INSERTED.*
            WHERE ReportID = ${id}
        `;

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'AI Report not found' });
        }

        res.status(200).json({
            message: 'AI report updated successfully',
            data: result.recordset[0]
        });
    } catch (err) {
        console.error('Update AI Report Error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const remove = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid Report ID' });
        }

        // تحسين: الحذف بخطوة واحدة
        const result = await sql.query`
            DELETE FROM AIReports WHERE ReportID = ${id};
            SELECT @@ROWCOUNT AS RowsAffected;
        `;

        if (result.recordset[0].RowsAffected === 0) {
            return res.status(404).json({ message: 'AI Report not found' });
        }

        res.status(200).json({ message: 'AI report deleted successfully' });
    } catch (err) {
        console.error('Delete AI Report Error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getAll, getById, create, update, remove };