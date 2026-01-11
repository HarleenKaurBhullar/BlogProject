const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const connectdb = require('./config/db');
const UserRoutes = require('./routers/user.routes');
const cookieParser = require("cookie-parser");
const app = express();
const port = 5080;

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cookieParser());


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