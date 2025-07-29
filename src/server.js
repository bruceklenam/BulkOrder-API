const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const authRoutes = require('./routes/auth');
const auth = require('./middleware/auth');

const app = express();

// ✅ CORS SETUP
app.use(cors());

// Connect to DB
connectDB();

// Body parser
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Protected test route
app.get('/api/protected', auth, (req, res) => {
  res.json({ msg: 'Welcome to the protected route!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
