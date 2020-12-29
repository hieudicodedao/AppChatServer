const app = require('express')()
require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')
const http = require('http')
const server = http.createServer(app)
const port = process.env.PORT || 9999
const routerRoom = require('./routes/RoomRouter')
const routerMessage = require('./routes/Messsages')
const testRouter = require('./routes/test')
const mongoose = require('mongoose')
const { db_url } = require('./config/index')
const UserModel = require('./models/User')

//connect to mongodb
mongoose
	.connect(process.env.DB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((res) => console.log('Connected to MongoDB...'))
	.catch((error) => console.log(error))

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)
//
const io = require('socket.io')(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST', 'PATCH', 'PUT'],
		allowedHeaders: ['my-custom-header'],
		credentials: true,
	},
})

app.use(cors())

// parse application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

io.on('connection', (socket) => {
	console.log('new connection')

	//set init value
	socket.on('join', (username, room) => {
		socket.username = username
		socket.room = room
		socket.join(room)
	})
	// take care input and emit message
	socket.on('sendMessage', ({ msg, obj_date, id }) => {
		socket.to(socket.room).emit('message', {
			username: socket.username,
			text: msg,
			date: obj_date,
			isDelete: false,
			id: id,
		})
	})

	socket.on('ivejustdeletesomeitem', (message) => {
		socket
			.to(socket.room)
			.broadcast.emit('thereisaguyjustdeletething', message)
	})

	//wait message from the other

	socket.on('disconnect', () => {
		console.log('disconnected')
	})
})

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept',
	)
	next()
})

//routes
app.use('/testing', testRouter)
app.use('/room', routerRoom)
app.use('/messages', routerMessage)

server.listen(port, () => {
	console.log('app is listening on port : ' + port)
})
