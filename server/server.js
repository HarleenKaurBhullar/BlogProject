const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const connectdb = require('./config/db');
const UserRoutes = require('./routers/user.routes');

const app = express();
const port = 5080;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Routes
app.use('/api/users', UserRoutes);

// Connect DB and start server

const startServer = async () => {
  try {
    await connectdb(); // call it here
    console.log('MongoDB connected successfully');
    app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
  } catch (err) {
    console.error('DB connection failed:', err);
    process.exit(1);
  }
};
startServer();