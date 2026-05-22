require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
// const csurf = require('@dr.pogodin/csurf');
const { connectDB } = require('./config/db');

const app = express();


app.use(helmet());


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { error: 'طلبات كثيرة جداً، حاول لاحقاً.' }
});
app.use(limiter);

const allowedOrigins = [process.env.CLIENT_ORIGIN || 'http://localhost:5173'];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));


app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));


// استثناء مسارات عامة (مهم جدًا لتجنب مشاكل login)
// const csrfProtection = csurf({
//     cookie: {
//         key: '_csrf',
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         sameSite: 'lax'
//     }
// });

// لا نطبق CSRF على login و csrf-token
app.use((req, res, next) => {
    const openRoutes = ['/auth/login', '/auth/csrf-token'];

    if (openRoutes.includes(req.path)) {
        return next();
    }

    return csrfProtection(req, res, next);
});

// مسار إعطاء CSRF token للفرونت
app.get('/auth/csrf-token', (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/roles', require('./routes/roles'));
app.use('/employees', require('./routes/employees'));
app.use('/doctors', require('./routes/doctors'));
app.use('/patients', require('./routes/patients'));
app.use('/appointments', require('./routes/appointments'));
app.use('/medical-records', require('./routes/medicalRecords'));
app.use('/prescriptions', require('./routes/prescriptions'));
app.use('/ai-reports', require('./routes/aiReports'));
app.use('/personal-info', require('./routes/personalInfo'));

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Hospital System API Running Successfully'
    });
});


app.use((req, res) => {
    res.status(404).json({
        error: `Route not found: ${req.originalUrl}`
    });
});


app.use((err, req, res, next) => {

    if (err.code === 'EBADCSRFTOKEN') {
        return res.status(403).json({
            error: 'CSRF Token Invalid or Missing'
        });
    }

    console.error('Server Error:', err);

    res.status(err.statusCode || 500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development'
            ? err.message
            : undefined
    });
});


const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDB();

        console.log('✅ Database connected successfully');

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error('❌ DB Connection Failed:', error.message);
        process.exit(1);
    }
};

startServer();