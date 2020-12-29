const jwt = require('jsonwebtoken')
const RoomModel = require('./../models/Room')

module.exports = Room_Middleware = async (req, res, next) => {
	//if doent send header
	if (!req.headers['authorization-room']) {
		res.sendStatus(403)
		return
	}
	const token_string = req.headers['authorization-room'].split(' ')
	const token_room = token_string[1]

	const decoded = jwt.verify(token_room, process.env.SECRET_KEY)
	if (!decoded) {
		res.sendStatus(403)
		return
	}
	const room = await RoomModel.findOne({ _id: decoded._id })
	//if doent find room
	if (!room) {
		res.sendStatus(403)
		return
	}
	res.locals.room = room
	next()
}
