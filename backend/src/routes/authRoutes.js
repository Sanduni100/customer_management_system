const express = require('express');
const router = express.Router();
const {
  registerCustomer,
  loginCustomer,
  loginAdmin,
  createAdmin,
  refreshToken,
} = require('../controllers/authController');
const { authenticate, authorize } = require('../middleware/auth');

// Public
router.post('/register', registerCustomer);
router.post('/login/customer', loginCustomer);
router.post('/login/admin', loginAdmin);
router.post('/refresh', refreshToken);

// Protected
router.post('/admin', authenticate, authorize('ADMIN'), createAdmin);

module.exports = router;
