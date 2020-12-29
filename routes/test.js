const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

//router.use will be the middleware
router.get('/', (req, res) => {
	const token = req.headers['auth-token']
	if (typeof token !== 'undefined') {
		jwt.verify(token, 'asdfasgasf', (err, decoded) => {
			if (err) return res.sendStatus(403)
			res.send(decoded)
		})
	} else {
	}
})

router.post('/', async (req, res) => {
	const user = req.body
	jwt.sign({ user }, 'asdfasgasf', { expiresIn: '30s' }, (err, token) => {
		res.json({
			token,
		})
	})
})
module.exports = router
