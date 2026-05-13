const { sql } = require('../config/db');


const login = async (req, res) => {
    try {

        const {
            Username,
            PasswordHash
        } = req.body;

      
        const result = await sql.query`
            SELECT *
            FROM Users
            WHERE Username = ${Username}
              AND PasswordHash = ${PasswordHash}
        `;

       
        if (result.recordset.length === 0) {
            return res.status(401).json({
                message: 'Invalid username or password'
            });
        }

   
        const user = result.recordset[0];

        res.json({
            message: 'Login successful',
            user
        });

    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    login
};