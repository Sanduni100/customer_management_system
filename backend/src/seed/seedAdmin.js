require('dotenv').config();
const bcrypt = require('bcrypt');
const sequelize = require('../config/db');
const Admin = require('../models/Admin');

async function seed() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    const email = process.env.SEED_ADMIN_EMAIL;
    const password = process.env.SEED_ADMIN_PASSWORD;

    if (!email || !password) {
      console.error('SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD must be set in .env');
      process.exit(1);
    }

    const existing = await Admin.findOne({ where: { email } });
    if (existing) {
      console.log(`Super admin already exists in the admins table: ${email}`);
      process.exit(0);
    }

    const hashed = await bcrypt.hash(password, 10);
    await Admin.create({ email, password: hashed });

    console.log('Super admin created successfully in the admins table:');
    console.log(`  email: ${email}`);
    console.log(`  password: ${password}`);
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err.message);
    process.exit(1);
  }
}

seed();
