const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const productSchema = sequelize.define(
  'Product',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
    },
    image_url: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: 'products',
    timestamps: false,
  }
);

module.exports = productSchema;
