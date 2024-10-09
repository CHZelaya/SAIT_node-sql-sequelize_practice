/**------------------------------------------------------------------------
 * *                                Imports
 *------------------------------------------------------------------------**/
const { DataTypes } = require('sequelize')
const sequelize = require('../utils/database')

/**-----------------------
 * *   Module for Course
 *------------------------**/

const Courses = sequelize.define('Courses', {
    coursename: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    credit: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
})

/**-----------------------
 * *       EXPORT
 *------------------------**/
module.exports = Courses