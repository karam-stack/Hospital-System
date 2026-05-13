const { sql } = require('../config/db');

const getAll = async (req, res) => {
    try {
        const result = await sql.query('SELECT * FROM PersonalInfo');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getById = async (req, res) => {
    try {
        const result = await sql.query`
            SELECT * FROM PersonalInfo
            WHERE PersonalInfoID = ${req.params.id}
        `;

        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500).send(err.message);
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

        await sql.query`
            INSERT INTO PersonalInfo
            (
                UserID,
                FullName,
                Email,
                Address,
                DateOfBirth,
                Gender
            )
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

        res.send('Personal info created');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const update = async (req, res) => {
    try {
        const {
            FullName,
            Email,
            Address,
            DateOfBirth,
            Gender
        } = req.body;

        await sql.query`
            UPDATE PersonalInfo
            SET
                FullName = ${FullName},
                Email = ${Email},
                Address = ${Address},
                DateOfBirth = ${DateOfBirth},
                Gender = ${Gender}
            WHERE PersonalInfoID = ${req.params.id}
        `;

        res.send('Personal info updated');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const remove = async (req, res) => {
    try {
        await sql.query`
            DELETE FROM PersonalInfo
            WHERE PersonalInfoID = ${req.params.id}
        `;

        res.send('Personal info deleted');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};