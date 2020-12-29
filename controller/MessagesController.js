const MessageInRoom = require('./../models/MessageInRoom')

module.exports.getListMessageFromRoom = async (req, res) => {
	const { room } = req.params
	const isExistRoom = await MessageInRoom.findOne({ room_name: room })
	if (isExistRoom) {
		res.json(isExistRoom)
	} else {
		res.json({ error: 'oc chos is real' })
	}
}

module.exports.addMessageFromRoom = async (req, res) => {
	const isExistRoom = await MessageInRoom.findOne({
		room_name: req.params.room,
	})
	if (!isExistRoom) {
		const newEle = new MessageInRoom({
			room_name: req.params.room,
			messages: [req.body],
		})
		newEle.save((error, newele) => {
			if (error) return console.error('error')
		})
	} else {
		const newMessages = [...isExistRoom.messages, req.body]
		const filter = { room_name: req.params.room }
		const update = {
			messages: newMessages,
		}
		await MessageInRoom.findOneAndUpdate(filter, update)
	}
	res.json({ res: 'successfully' })
}

module.exports.fixMessageFromRoom = async (req, res) => {
	let element = await MessageInRoom.findOne({ room_name: req.params.room })
	let message_need_to_remove = element.messages.find(
		(ele) => ele.id === req.body.message.id,
	)
	message_need_to_remove.text = 'Message has been removed'
	message_need_to_remove.isDelete = true

	for (let i = 0; i < element.messages.length; ++i) {
		if (element.messages[i].id === req.body.message.id) {
			element.messages[i] = message_need_to_remove
		}
	}

	const filter = { room_name: req.params.room }
	const update = { messages: element.messages }

	await MessageInRoom.findOneAndUpdate(filter, update)

	res.json({
		message: 'successful',
	})
}

module.exports.doWeNeedRender = (req, res) => {
	if (req.body.room !== res.locals.room.room) {
		//wrong route
		res.sendStatus(403)
		return
	}
	res.json({
		username: res.locals.user.username,
		room: res.locals.room.room,
	})
}
