const jwt = require('jsonwebtoken')
const UserModel = require('./../models/User')

module.exports = User_Middleware = async (req, res, next) => {
	//if doent send header
	if (!req.headers['authorization-user']) {
		res.sendStatus(403)
		return
	}
	const token_string = req.headers['authorization-user'].split(' ')
	const token_user = token_string[1]

	const decoded = jwt.verify(token_user, process.env.SECRET_KEY)
	if (!decoded) {
		res.sendStatus(403)
		return
	}
	const user = await UserModel.findOne({ _id: decoded._id })
	//if doent find user
	if (!user) {
		res.sendStatus(403)
		return
	}
	res.locals.user = user
	next()
}
