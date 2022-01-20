const {DataTypes} = require('sequelize')
const db = require('../db')

const List = db.define("list", {
    gameName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    releaseDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER
    },
    apiQuery: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gameId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
})

module.exports = List