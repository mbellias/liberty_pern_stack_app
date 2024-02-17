const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const orderSchema = sequelize.define(
  'Order',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.STRING,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
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
    phone_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    distributor_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Pendiente',
      allowNull: false,
      validate: {
        isIn: [['Pendiente', 'Cancelado', 'Cumplido']],
      },
    },
  },
  {
    tableName: 'orders',
    timestamps: false,
  }
);

module.exports = orderSchema;
