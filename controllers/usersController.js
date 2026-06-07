const getAll = async (req, res) => {
    res.json({ message: "OK GET ALL USERS" });
};

const getById = async (req, res) => {
    res.json({ message: "OK GET USER" });
};

const createUser = async (req, res) => {
    res.json({ message: "OK CREATE USER" });
};

const remove = async (req, res) => {
    res.json({ message: "OK DELETE USER" });
};

const update = async (req, res) => {
    res.json({ message: "OK UPDATE USER" });
};

module.exports = {
    getAll,
    getById,
    createUser,
    remove,
    update
};