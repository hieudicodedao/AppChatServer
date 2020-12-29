const mongoose = require('mongoose')

const RoomScheme = mongoose.Schema({
	room: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
})

const Room = mongoose.model('room', RoomScheme, 'Rooms')

module.exports = Room
