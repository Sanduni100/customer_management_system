const validator = require('validator');
const FormSubmission = require('../models/FormSubmission');
const { isValidLocalMobileNumber, GENDERS } = require('../utils/validators');

// POST /api/forms 
async function submitForm(req, res) {
  try {
    const { firstName, lastName, email, gender, mobileNumber, address, feedback } = req.body;

    const errors = [];
    if (!firstName || !firstName.trim()) errors.push('firstName is required');
    if (!lastName || !lastName.trim()) errors.push('lastName is required');
    if (!email || !validator.isEmail(email)) errors.push('A valid email is required');
    if (!gender || !GENDERS.includes(gender)) errors.push('gender must be MALE, FEMALE or OTHER');
    if (!mobileNumber || !isValidLocalMobileNumber(mobileNumber)) {
      errors.push('mobileNumber must be a valid local mobile number (e.g. 0771234567)');
    }
    if (!address || !address.trim()) errors.push('address is required');

    if (errors.length > 0) {
      return res.status(400).json({ message: 'Validation failed', errors });
    }

    const existing = await FormSubmission.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: 'A submission with this email already exists' });
    }

    const submission = await FormSubmission.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email,
      gender,
      mobileNumber: mobileNumber.trim(),
      address: address.trim(),
      feedback: feedback ? feedback.trim() : null,
      userCreated: req.user.email,
      dateCreated: new Date(),
      createdByCustomerId: req.user.id,
    });

    return res.status(201).json({ message: 'Form submitted successfully', submission });
  } catch (err) {
    return res.status(500).json({ message: 'Form submission failed', error: err.message });
  }
}

module.exports = { submitForm };
