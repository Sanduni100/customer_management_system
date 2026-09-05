const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const formRoutes = require('./routes/formRoutes');
const adminFormRoutes = require('./routes/adminFormRoutes');

const app = express();

app.use(cors({ origin: process.env.FRONTEND_ORIGIN || '*' }));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/admin/forms', adminFormRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Central error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Internal server error' });
});

module.exports = app;
