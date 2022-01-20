const db = require('../db')

const ListModel = require('./list')
const UserModel = require('./user')
const CommentModel = require('./userComment')

UserModel.hasMany(ListModel);
UserModel.hasMany(CommentModel);

ListModel.belongsTo(UserModel);
ListModel.hasMany(CommentModel, {onDelete: 'CASCADE'});

CommentModel.belongsTo(ListModel);

module.exports = {
    dbConnection: db,
    models: {
        ListModel,
        UserModel,
        CommentModel
    }
}