const router = require('express').Router()
const { models } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { UniqueConstraintError } = require("sequelize/lib/errors");

router.post('/register', async (req, res) => {
    let { firstName, lastName, email, password, userName } = req.body
    try {
        const newUser = await models.UserModel.create({
            firstName,
            lastName,
            email,
            password: bcrypt.hashSync(password, 13),
            userName
        })

        const token = jwt.sign({id: newUser.id}, process.env.JWT_SECRET, {expiresIn: 60*60*72})

        res.status(201).json({
            message: "User successfully registered",
            token
        })
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Email already in use",
            });
        } else {
            res.status(500).json({
                message: "Failed to register user",
            })
        }
    }
})

router.post('/login', async (req, res) => {
    let { userName, password } = req.body;

    try {
        let loginUser = await models.UserModel.findOne({
            where: {
                userName: userName
            },
        })

        if(loginUser) {
            let passwordComparison = await bcrypt.compare(password, loginUser.password);

            if(passwordComparison) {
                let token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET, {expiresIn: 60*60*72})
                
                res.status(200).json({
                    message: "User successfully logged in",
                    token
                })
            } else {
                res.status(401).json({
                    message: "Incorrect user name or password"
                })
            }
        } else {
            res.status(401).json({
                message: "Incorrect user name or password"
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "Filed to find user"
        })
    }
})

router.put('/updateUserName', async (req, res) => {
    try {
        let updatingUser = await models.UserModel.update(
            { userName: req.body.updateUserName },
            {where: { userName: req.body.userName }}
        )
        
        res.status(200).json({
            message: "User Name updated",
        })
    } catch (err) {
        res.status(500).json({
            message: "Failed to update user name",
            error: err
        })
    }
})

module.exports = router