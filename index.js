// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Enable CORS for the frontend Render domain
app.use(cors({
  origin: 'https://taskmaster-frontend-jf3h.onrender.com',
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  credentials: true,
}));

app.use(express.json());
app.use('/api/tasks', taskRoutes);

mongoose.connect(process.env.MONGODB_URI || 'your_mongodb_uri_here')
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error(err));
