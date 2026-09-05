// Validates Sri Lankan local mobile numbers, e.g. 0771234567 or +94771234567
function isValidLocalMobileNumber(value) {
  if (typeof value !== 'string') return false;
  return /^(?:0\d{9}|\+94\d{9})$/.test(value.trim());
}

const GENDERS = ['MALE', 'FEMALE', 'OTHER'];

module.exports = { isValidLocalMobileNumber, GENDERS };
