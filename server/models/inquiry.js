const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const inquirySchema = sequelize.define(
  'Inquiry',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
    },
    phone_number: {
      type: DataTypes.STRING(15),
    },
    products: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Pendiente',
      allowNull: false,
      validate: {
        isIn: [['Pendiente', 'Cumplido']],
      },
    },
  },
  {
    tableName: 'inquiries',
    timestamps: false,
  }
);

module.exports = inquirySchema;
