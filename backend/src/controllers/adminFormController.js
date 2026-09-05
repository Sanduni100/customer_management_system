const { Op } = require('sequelize');
const validator = require('validator');
const FormSubmission = require('../models/FormSubmission');
const { isValidLocalMobileNumber, GENDERS } = require('../utils/validators');

// GET /api/admin/forms?gender=MALE&search=john
async function getAllSubmissions(req, res) {
  try {
    const { gender, search } = req.query;
    const where = {};

    if (gender) {
      if (!GENDERS.includes(gender)) {
        return res.status(400).json({ message: 'gender must be MALE, FEMALE or OTHER' });
      }
      where.gender = gender;
    }

    if (search) {
      where[Op.or] = [
        { firstName: { [Op.like]: `%${search}%` } },
        { lastName: { [Op.like]: `%${search}%` } },
      ];
    }

    const submissions = await FormSubmission.findAll({
      where,
      order: [['dateCreated', 'DESC']],
    });

    return res.status(200).json({ count: submissions.length, submissions });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch submissions', error: err.message });
  }
}

// PUT /api/admin/forms/:id
async function updateSubmission(req, res) {
  try {
    const { id } = req.params;
    const submission = await FormSubmission.findByPk(id);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    const { firstName, lastName, email, gender, mobileNumber, address, feedback } = req.body;
    const errors = [];

    if (email !== undefined && !validator.isEmail(email)) errors.push('Invalid email format');
    if (gender !== undefined && !GENDERS.includes(gender)) errors.push('gender must be MALE, FEMALE or OTHER');
    if (mobileNumber !== undefined && !isValidLocalMobileNumber(mobileNumber)) {
      errors.push('mobileNumber must be a valid local mobile number');
    }
    if (firstName !== undefined && !firstName.trim()) errors.push('firstName cannot be empty');
    if (lastName !== undefined && !lastName.trim()) errors.push('lastName cannot be empty');
    if (address !== undefined && !address.trim()) errors.push('address cannot be empty');

    if (errors.length > 0) {
      return res.status(400).json({ message: 'Validation failed', errors });
    }

    if (email && email !== submission.email) {
      const emailTaken = await FormSubmission.findOne({ where: { email } });
      if (emailTaken) {
        return res.status(409).json({ message: 'Another submission already uses this email' });
      }
    }

    await submission.update({
      ...(firstName !== undefined && { firstName: firstName.trim() }),
      ...(lastName !== undefined && { lastName: lastName.trim() }),
      ...(email !== undefined && { email }),
      ...(gender !== undefined && { gender }),
      ...(mobileNumber !== undefined && { mobileNumber: mobileNumber.trim() }),
      ...(address !== undefined && { address: address.trim() }),
      ...(feedback !== undefined && { feedback }),
      userModified: req.user.email,
      dateModified: new Date(),
    });

    return res.status(200).json({ message: 'Submission updated', submission });
  } catch (err) {
    return res.status(500).json({ message: 'Update failed', error: err.message });
  }
}

// DELETE /api/admin/forms/:id
async function deleteSubmission(req, res) {
  try {
    const { id } = req.params;
    const submission = await FormSubmission.findByPk(id);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    await submission.destroy();
    return res.status(200).json({ message: 'Submission deleted' });
  } catch (err) {
    return res.status(500).json({ message: 'Delete failed', error: err.message });
  }
}

module.exports = { getAllSubmissions, updateSubmission, deleteSubmission };
