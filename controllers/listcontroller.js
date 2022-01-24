const Express = require('express')
const { models } = require("../models")
const { validateSession } = require("../middleware");
const { Op } = require('sequelize');
const router = require('express').Router()

router.post('/updateList', async (req, res) => {
    const { gameName, releaseDate, apiQuery, background, genres, metacritic, stores, rawgLink, screenshots, gameId, rating } = req.body
    const { id } = req.user
    const gameForList = {
        gameName,
        releaseDate,
        apiQuery,
        gameId,
        background,
        genres,
        metacritic,
        stores,
        rawgLink,
        screenshots,
        rating,
        userId: id,
        listId: id
    }

    try {
        const newListItem = await models.ListModel.create(gameForList);
        res.status(200).json(newListItem)
    } catch (err) {
        res.status(500).json({ error: err })
    }
});

router.get('/myList', async (req, res) => {
    let { id } = req.user;


    try {
        const userList = await models.ListModel.findAll({
            where: {
                userId: id
            },
            include: [
            {
                model: models.CommentModel,
                // where: {
                //     gameId: models.CommentModel.gameId
                // }
            },
        ]
    }
        )
        res.status(200).json(userList)
    } catch (err) {
        res.status(500).json({error: err})
    }
});

router.put('/updateRating', async (req, res) => {
    const rating = req.body.rating;
    const gameId = req.body.gameId
    const {id} = req.user

    const query = {
        where: {
            userId: id,
            gameId: gameId
        }
    }

    const updateGame = {
        rating: rating
    }

    try {
        const update = await models.ListModel.update(updateGame, query)
        res.status(200).json(update)
    } catch (err) {
        res.status(500).json({error:err})
    }
});

router.delete('/deleteGame', async (req, res) => {
    const {id} = req.user
    const gameId = req.body.gameId

    const query = {
        where: {
            gameId,
            userId: id
        },
        include: [
            {
                model: models.CommentModel
            }
        ]}
    
    try {
        const removed = await models.ListModel.destroy(query)
        .then(res.status(200).json({message: "Game removed from list"}))
    } catch (err) {
        res.status(500).json({error: err})
    }
    
})

module.exports = router;