const express = require('express')
const roomRouter = express.Router()
const controller = require('../controller/RoomController')
const User_Middleware = require('../middleware/User_Middleware')
//Room
roomRouter.get('/isExistUser', User_Middleware, controller.isExistUser)

roomRouter.post('/checkRoom', controller.checkRoom)

roomRouter.post('/createRoom', controller.createRoom)

//Users
roomRouter.post('/checkUser', controller.checkUser)

roomRouter.post('/users', controller.addUser)

module.exports = roomRouter
