const { sql } = require('../config/db');

const getAll = async (req, res) => {
    const result = await sql.query('SELECT * FROM Doctors');
    res.json(result.recordset);
};

const getById = async (req, res) => {
    const result = await sql.query`
        SELECT * FROM Doctors WHERE DoctorID = ${req.params.id}
    `;

    res.json(result.recordset[0]);
};

const create = async (req, res) => {
    const { UserID, Specialization, ClinicNumber } = req.body;

    await sql.query`
        INSERT INTO Doctors(UserID, Specialization, ClinicNumber)
        VALUES(${UserID}, ${Specialization}, ${ClinicNumber})
    `;

    res.send('Doctor created');
};

const update = async (req, res) => {
    const { Specialization, ClinicNumber } = req.body;

    await sql.query`
        UPDATE Doctors
        SET Specialization = ${Specialization},
            ClinicNumber = ${ClinicNumber}
        WHERE DoctorID = ${req.params.id}
    `;

    res.send('Doctor updated');
};

const remove = async (req, res) => {
    await sql.query`
        DELETE FROM Doctors WHERE DoctorID = ${req.params.id}
    `;

    res.send('Doctor deleted');
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};