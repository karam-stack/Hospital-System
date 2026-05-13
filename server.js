const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/patients', require('./routes/patients'));
app.use('/doctors', require('./routes/doctors'));
app.use('/employees', require('./routes/employees'));
app.use('/appointments', require('./routes/appointments'));
app.use('/medical-records', require('./routes/medicalRecords'));
app.use('/prescriptions', require('./routes/prescriptions'));
app.use('/ai-reports', require('./routes/aiReports'));
app.use('/users', require('./routes/users'));
app.use('/roles', require('./routes/roles'));
app.use('/personal-info', require('./routes/personalInfo'));
app.use('/auth', require('./routes/auth'));
app.get('/', (req, res) => {
    res.send('Hospital System API Running');
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});