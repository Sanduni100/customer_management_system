const express = require('express');
const router = express.Router();
const {
  getAllSubmissions,
  updateSubmission,
  deleteSubmission,
} = require('../controllers/adminFormController');
const { authenticate, authorize } = require('../middleware/auth');

router.use(authenticate, authorize('ADMIN'));

router.get('/', getAllSubmissions);

router.put('/:id', updateSubmission);

router.delete('/:id', deleteSubmission);

module.exports = router;
