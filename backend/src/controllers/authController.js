const bcrypt = require('bcrypt');
const crypto = require('crypto');
const validator = require('validator');
const Customer = require('../models/Customer');
const Admin = require('../models/Admin');
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require('../utils/token');

const SALT_ROUNDS = 10;

// POST /api/auth/register  
async function registerCustomer(req, res) {
  try {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'email, password and confirmPassword are required' });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
    if (password.length < 4) {
      return res.status(400).json({ message: 'Password must be at least 4 characters' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const existing = await Customer.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: 'Email is already registered' });
    }

    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    const customer = await Customer.create({ email, password: hashed });

    return res.status(201).json({
      message: 'Customer registered successfully',
      customer: { id: customer.id, email: customer.email },
    });
  } catch (err) {
    return res.status(500).json({ message: 'Registration failed', error: err.message });
  }
}

// POST /api/auth/login/customer  
async function loginCustomer(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'email and password are required' });
    }

    const customer = await Customer.findOne({ where: { email } });
    if (!customer) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const match = await bcrypt.compare(password, customer.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const principal = { id: customer.id, email: customer.email, role: 'CUSTOMER' };
    const accessToken = generateAccessToken(principal);
    const refreshToken = generateRefreshToken(principal);

    return res.status(200).json({
      message: 'Login successful',
      accessToken,
      refreshToken,
      user: principal,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Login failed', error: err.message });
  }
}

// POST /api/auth/login/admin  
async function loginAdmin(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'email and password are required' });
    }

    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const principal = { id: admin.id, email: admin.email, role: 'ADMIN' };
    const accessToken = generateAccessToken(principal);
    const refreshToken = generateRefreshToken(principal);

    return res.status(200).json({
      message: 'Login successful',
      accessToken,
      refreshToken,
      user: principal,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Login failed', error: err.message });
  }
}

// POST /api/auth/admin  
async function createAdmin(req, res) {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'email is required' });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const existing = await Admin.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: 'Email is already registered' });
    }

    const generatedPassword = crypto.randomBytes(6).toString('base64url'); // e.g. "aZ3f-Kd9Q"
    const hashed = await bcrypt.hash(generatedPassword, SALT_ROUNDS);

    const admin = await Admin.create({ email, password: hashed });

    return res.status(201).json({
      message: 'Admin account created',
      admin: { id: admin.id, email: admin.email },
      generatedPassword, 
    });
  } catch (err) {
    return res.status(500).json({ message: 'Admin creation failed', error: err.message });
  }
}

// POST /api/auth/refresh
async function refreshToken(req, res) {
  try {
    const { refreshToken: token } = req.body;
    if (!token) {
      return res.status(400).json({ message: 'refreshToken is required' });
    }

    const decoded = verifyRefreshToken(token);
    const model = decoded.role === 'ADMIN' ? Admin : Customer;
    const principal = await model.findByPk(decoded.id);
    if (!principal) {
      return res.status(401).json({ message: 'Account no longer exists' });
    }

    const accessToken = generateAccessToken({
      id: principal.id,
      email: principal.email,
      role: decoded.role,
    });
    return res.status(200).json({ accessToken });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired refresh token' });
  }
}

module.exports = {
  registerCustomer,
  loginCustomer,
  loginAdmin,
  createAdmin,
  refreshToken,
};
