const Express = require('express')
const router = require('express').Router()
let validateSession = require('../middleware')
const { models } = require("../models")

router.post('/addComment', async (req, res) => {
    const { comment, gameId } = req.body
    const { id } = req.user
    const createComment = {
        comment,
        gameId,
        userId: id,
        listId: id
    }

    const associate = {
        listId: gameId
    }
    
    try {
        const newComment = await models.CommentModel.create(createComment, associate);
        res.status(200).json(newComment);
    } catch (err) {
        res.status(500).json({error:err})
    }
});

router.get('/getComments', async (req, res) => {
    const { id } = req.user

    try {
        const comments = await models.CommentModel.findAll({
            where: {
                userId: id,
            }
        });
        res.status(200).json(comments)
    } catch (err) {
        res.status(500).json({error:err})
    }
});

router.put('/updateComment', async (req, res) => {
    const { comment, gameId } = req.body
    const { id } = req.user

    const query = {
        where: {
            userId: id,
            gameId
        }
    }

    const updateComment = {
        comment
    }

    try {
        const update = await models.CommentModel.update(updateComment, query)
        res.status(200).json(update)
    } catch (err) {
        res.status(500).json({error: err})
    }
});

router.delete('/deleteComment', async (req, res) => {
    const { id } = req.user;
    const { gameId } = req.body

    try{
        const query = {
            where: {
                userId: id,
                gameId
            }
        }
        await models.CommentModel.destroy(query)
        res.status(200).json({message: "Comment deleted"})
    } catch (err) {
        res.status(500).json({error:err})
    }
});

module.exports = router;