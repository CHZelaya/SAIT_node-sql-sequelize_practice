const { DataTypes } = require('sequelize');
//import connection
const sequelize = require('../utils/database');

// creating my model

const Student = sequelize.define('Student', {
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

}, {
    timestamps: false
})

module.exports = Student;