const {DataTypes} = require('sequelize')
const db = require('../db')

const Comment = db.define('comment', {
    comment: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    gameId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
})

module.exports = Comment