const {DataTypes, STRING} = require('sequelize')
const db = require('../db')

const List = db.define("list", {
    gameName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    releaseDate: {
        type: DataTypes.DATE,
        allowNull: true,
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
    background: {
        type: DataTypes.STRING,
        allowNull: true
    },
    genres: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: true
    },
    metacritic: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    stores: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: true
    },
    rawgLink: {
        type: DataTypes.STRING,
        allowNull: false
    },
    screenshots: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    listId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = List