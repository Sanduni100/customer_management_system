require('dotenv').config();
const app = require('./app');
const sequelize = require('./config/db');
require('./models/Customer');
require('./models/Admin');
require('./models/FormSubmission');

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log('MySQL connection established.');

    await sequelize.sync(); // creates tables if they don't exist
    console.log('Models synced.');

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
}

start();
