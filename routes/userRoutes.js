const user = require('../models/user.js')
const express = require('express')
const { registerUser,loginUser,getUser, getAllUsers } = require('../controllers/userController.js') 

const userRouter= express.Router()


userRouter.post('/register', registerUser)

userRouter.post('/login', loginUser)

 userRouter.get('/:id',getUser)
userRouter.get('/',getAllUsers)

module.exports = userRouter;


