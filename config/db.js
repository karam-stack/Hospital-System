const sql = require('mssql');

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

let pool;

const connectDB = async () => {
    pool = await sql.connect(config);
};

const getPool = () => {
    if (!pool) {
        throw new Error('Database not connected');
    }
    return pool;
};

module.exports = {
    sql,
    connectDB,
    getPool
};