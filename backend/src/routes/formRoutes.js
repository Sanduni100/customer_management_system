const express = require('express');
const router = express.Router();
const { submitForm } = require('../controllers/formController');
const { authenticate, authorize } = require('../middleware/auth');

router.post('/', authenticate, authorize('CUSTOMER'), submitForm);

module.exports = router;
