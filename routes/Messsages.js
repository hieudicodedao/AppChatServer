var express = require('express')
var routerMessage = express.Router()
var MessagesController = require('../controller/MessagesController')
var Room_Middleware = require('../middleware/Room_Middleware')
var User_Middleware = require('../middleware/User_Middleware')

routerMessage.get('/:room', MessagesController.getListMessageFromRoom)

routerMessage.post('/:room', MessagesController.addMessageFromRoom)

routerMessage.patch('/:room', MessagesController.fixMessageFromRoom)

routerMessage.post(
	'/',
	Room_Middleware,
	User_Middleware,
	MessagesController.doWeNeedRender,
)

module.exports = routerMessage
