// Importing mysql module

const { Sequelize } = require('sequelize');

//creating connection string using createConnection()

const sequelize = new Sequelize('sait-db', 'root', 'Pcc$8804112923', {
    host: 'localhost',
    dialect: 'mysql'
})

// exporting the connection for use in any js file.
module.exports = sequelize;