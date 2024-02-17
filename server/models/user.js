const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const sequelize = require('../config/database');

const userSchema = sequelize.define(
  'User',
  {
    user_id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      allowNull: false,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phone_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    password_hash: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    verification_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    reset_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reset_token_expires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['client', 'distributor', 'admin']],
      },
    },
    distributor_id: {
      type: DataTypes.STRING(6),
      defaultValue: null,
      allowNull: true,
      validate: {
        is: /^[a-zA-Z0-9]{6}$/i,
      },
    },
  },
  {
    tableName: 'users',
    timestamps: false,
  }
);

userSchema.beforeCreate((user, options) => {
  if (user.role === 'distributor') {
    user.distributor_id = Math.random().toString(36).substring(2, 8);
  }
});

module.exports = userSchema;
