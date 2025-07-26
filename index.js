const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Root route for testing server status
app.get('/', (req, res) => {
  res.json({ message: '✅ TaskMaster Backend is running!' });
});

// Task API routes
app.use('/api/tasks', taskRoutes);
console.log('📡 Route /api/tasks registered');

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
