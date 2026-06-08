const sql = require("mssql");

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: false, // 🌟 تم تعديلها إلى false لأن نسخة 2008 لا تدعم التشفير الحديث
    trustServerCertificate: true,
    // 🌟 السطور السحرية للتوافق بين Node v24 الحديث وسيرفر 2008 القديم:
    cryptoCredentialsDetails: {
      minVersion: "TLSv1",
    },
    tdsVersion: "7_2", // إجبار حزمة mssql على التحدث بلغة SQL Server 2008
  },
};

let pool;

const connectDB = async () => {
  pool = await sql.connect(config);
};

const getPool = () => {
  if (!pool) {
    throw new Error("Database not connected");
  }
  return pool;
};

module.exports = {
  sql,
  connectDB,
  getPool,
};