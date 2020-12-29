const mogoose = require('mongoose')

const UserScheme = new mogoose.Schema({
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
})

const User = mogoose.model('User', UserScheme, 'Users')

module.exports = User
