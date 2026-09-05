const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Customer = require('./Customer');

const FormSubmission = sequelize.define(
  'FormSubmission',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    gender: {
      type: DataTypes.ENUM('MALE', 'FEMALE', 'OTHER'),
      allowNull: false,
    },
    mobileNumber: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    feedback: { type: DataTypes.TEXT, allowNull: true },

    userCreated: { type: DataTypes.STRING, allowNull: false },
    dateCreated: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    userModified: { type: DataTypes.STRING, allowNull: true },
    dateModified: { type: DataTypes.DATE, allowNull: true },
  },
  {
    tableName: 'form_submissions',
    timestamps: false,
  }
);

// A submission is created by a customer
FormSubmission.belongsTo(Customer, { foreignKey: 'createdByCustomerId', allowNull: true });

module.exports = FormSubmission;
