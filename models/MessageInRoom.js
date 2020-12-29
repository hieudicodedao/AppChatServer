const mogoose = require('mongoose')

const MessageInRoomSchema = new mogoose.Schema({
	room_name: {
		type: String,
		required: true,
	},
	messages: [Object],
})

const MessageInRoom = mogoose.model(
	'MessageInRoom',
	MessageInRoomSchema,
	'Message_in_room',
)

module.exports = MessageInRoom
