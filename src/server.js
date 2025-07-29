const express = require('express');
const connectDB = require('./config/database');
const authRoutes = require('./routes/auth');
const auth = require('./middleware/auth');
const cors = require('cors'); // 🟢 ADD THIS

const app = express();

// Connect to database
connectDB();

// 🟢 Enable CORS
app.use(cors({
  origin: 'http://localhost:5176', // frontend dev URL
  credentials: true
}));

// Init middleware
app.use(express.json({ extended: false }));

// Define routes
app.use('/api/auth', authRoutes);

// Protected route
app.get('/api/protected', auth, (req, res) => {
  res.json({ msg: 'Welcome to the protected route!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
