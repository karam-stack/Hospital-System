const { getPool } = require('../config/db');
const bcrypt = require('bcrypt');

// 1. جلب جميع المستخدمين (للمدير فقط كما حددنا في الـ Routes)
const getAll = async (req, res) => {
    try {
        const pool = await getPool();
        // نجلب البيانات مع استبعاد كلمة المرور لأواعي الأمان
        const result = await pool.query(`
            SELECT UserID, Username, RoleID, IsActive 
            FROM Users 
            ORDER BY UserID DESC
        `);

        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('Get All Users Error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// 2. جلب مستخدم معين عن طريق الـ ID (محمي بفلتر الملكية أو المدير)
const getById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid User ID' });
        }

        const pool = await getPool();
        const result = await pool.query(`
            SELECT UserID, Username, RoleID, IsActive 
            FROM Users 
            WHERE UserID = ${id}
        `);

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(result.recordset[0]);
    } catch (err) {
        console.error('Get User By ID Error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// 3. إنشاء مستخدم جديد (تشفير كلمة المرور + منع تكرار اسم المستخدم)
const createUser = async (req, res) => {
    try {
        const { Username, Password, RoleID } = req.body;
        const pool = await getPool();

        // فحص هل اسم المستخدم محجوز مسبقاً لمنع التكرار (Unique Username)
        const userExists = await pool.query(`
            SELECT * FROM Users WHERE Username = ${Username}
        `);

        if (userExists.recordset.length > 0) {
            return res.status(409).json({ message: 'Username is already taken' });
        }

        // تشفير كلمة المرور قبل حفظها في قاعدة البيانات لحماية حسابات النظام
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(Password, saltRounds);

        // إدخال الحساب الجديد وجلب بياناته مباشرة (بدون الباسورد بالطبع)
        const result = await pool.query(`
            INSERT INTO Users (Username, Password, RoleID, IsActive)
            OUTPUT INSERTED.UserID, INSERTED.Username, INSERTED.RoleID, INSERTED.IsActive
            VALUES (${Username}, ${hashedPassword}, ${RoleID}, 1)
        `);

        res.status(201).json({
            message: 'User created successfully',
            data: result.recordset[0]
        });
    } catch (err) {
        console.error('Create User Error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// 4. تحديث بيانات المستخدم (تحديث ذكي اختياري مع دعم تشفير الباسورد الجديد إن وُجد)
const update = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid User ID' });
        }

        const { Username, Password, RoleID, IsActive } = req.body;
        const pool = await getPool();

        // جلب البيانات الحالية للمستخدم
        const currentUser = await pool.query(`
            SELECT Username, Password, RoleID, IsActive FROM Users WHERE UserID = ${id}
        `);

        if (currentUser.recordset.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        // 1. معالجة تحديث اسم المستخدم ومنع التضارب مع حساب آخر
        let finalUsername = currentUser.recordset[0].Username;
        if (Username !== undefined && Username !== finalUsername) {
            const checkUnique = await pool.query(`
                SELECT * FROM Users WHERE Username = ${Username} AND UserID != ${id}
            `);
            if (checkUnique.recordset.length > 0) {
                return res.status(409).json({ message: 'Username is already taken by another user' });
            }
            finalUsername = Username;
        }

        // 2. معالجة تشفير الباسورد في حال قام المستخدم بتغييره فقط
        let finalPassword = currentUser.recordset[0].Password;
        if (Password !== undefined && Password.trim() !== "") {
            const saltRounds = 10;
            finalPassword = await bcrypt.hash(Password, saltRounds);
        }

        // 3. معالجة باقي الحقول الاختيارية
        const finalRoleID = RoleID !== undefined ? RoleID : currentUser.recordset[0].RoleID;
        const finalIsActive = IsActive !== undefined ? IsActive : currentUser.recordset[0].IsActive;

        // تنفيذ التحديث الفعلي
        const result = await pool.query(`
            UPDATE Users
            SET 
                Username = ${finalUsername},
                Password = ${finalPassword},
                RoleID = ${finalRoleID},
                IsActive = ${finalIsActive}
            OUTPUT INSERTED.UserID, INSERTED.Username, INSERTED.RoleID, INSERTED.IsActive
            WHERE UserID = ${id}
        `);

        res.status(200).json({
            message: 'User updated successfully',
            data: result.recordset[0]
        });
    } catch (err) {
        console.error('Update User Error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// 5. حذف مستخدم (للمدير فقط)
const remove = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid User ID' });
        }

        const pool = await getPool();
        const result = await pool.query(`
            DELETE FROM Users WHERE UserID = ${id};
            SELECT @@ROWCOUNT AS RowsAffected;
        `);

        if (result.recordset[0].RowsAffected === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error('Delete User Error:', err);
        res.status(500).json({ 
            message: 'Internal server error. Note: Check if user is linked to other tables (Doctors/Employees/Patients)' 
        });
    }
};

module.exports = {
    getAll,
    getById,
    createUser,
    remove,
    update
};