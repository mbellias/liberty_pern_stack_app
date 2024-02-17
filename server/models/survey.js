const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const surveySchema = sequelize.define(
  'Survey',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    categories: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  },
  {
    tableName: 'surveys',
    timestamps: false,
  }
);

module.exports = surveySchema;
