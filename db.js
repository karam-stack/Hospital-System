const sql = require('mssql');
require('dotenv').config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: 'localhost',   // 👈 مهم: احذف SQLEXPRESS مؤقتاً
    database: process.env.DB_NAME,

    options: {
        encrypt: false,              // ❌ أهم سطر
        trustServerCertificate: true // ✔ مهم
    }
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log("✅ Connected to SQL Server");
        return pool;
    })
    .catch(err => {
        console.log("❌ DB Connection Failed:", err);
    });

module.exports = { sql, poolPromise };