const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserModel = require('./../models/User')
const RoomModel = require('../models/Room')

module.exports.checkRoom = async (req, res) => {
	const findRoom = await RoomModel.findOne({ room: req.body.room })
	if (findRoom) {
		let isMatch = await bcrypt.compareSync(
			req.body.password,
			findRoom.password,
		)
		if (isMatch) {
			let token_room = jwt.sign(
				{
					_id: findRoom._id,
				},
				process.env.SECRET_KEY,
			)
			res.json({ res: 'match', token_room })
		} else {
			res.json({ err: 'no match' })
		}
	} else {
		res.json({ err: 'abc' })
	}
}

module.exports.createRoom = async (req, res) => {
	var salt = bcrypt.genSaltSync(10)
	var hash = bcrypt.hashSync(req.body.password, salt)
	const newRoom = {
		room: req.body.room,
		password: hash,
	}
	const Room = RoomModel(newRoom)
	const room = await RoomModel.findOne({ room: req.body.room })
	if (!room) {
		await Room.save((err, room) => {
			if (err) res.json({ err: 'Loi' })
		})
	} else {
		res.json({ taken: 'true' })
		return
	}
	res.json({ res: 'Suscessful' })
}

module.exports.checkUser = async (req, res) => {
	const user = await UserModel.findOne({ username: req.body.username })
	if (user) {
		let isMatch = await bcrypt.compareSync(req.body.password, user.password)
		let token_user = jwt.sign(
			{
				_id: user._id,
			},
			process.env.SECRET_KEY,
		)
		if (isMatch) {
			res.json({ res: 'match', token_user })
		} else {
			res.json({ err: 'no match' })
		}
	} else {
		res.json({ err: 'no match' })
	}
}

module.exports.addUser = async (req, res) => {
	var salt = bcrypt.genSaltSync(10)
	var hash = bcrypt.hashSync(req.body.password, salt)
	const newUser = {
		username: req.body.username,
		password: hash,
	}
	const User = UserModel(newUser)
	const user = await UserModel.findOne({ username: req.body.username })
	if (!user) {
		await User.save((err, user) => {
			if (err) res.json({ err: 'Loi' })
		})
	} else {
		res.json({ taken: 'true' })
		return
	}
	res.json({ res: 'Suscessful' })
}

module.exports.isExistUser = (req, res) => {
	res.json({
		username: res.locals.user.username,
	})
}
