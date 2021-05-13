require('dotenv').config()

const{CONNECTION_STRING2, SERVER_PORT, SESSION_SECRET} = process.env

const massive = require('massive')
const express = require('express')
const app = express()



const http = require('http').createServer(app)

const session = require('express-session')
// const server = http.createServer(app)
// const io = socketio(server)
// const socketio = io.listen(4000)

const authCtrl = require('./controllers/authCtrl');
const movieCtrl = require('./controllers/movieCtrl')
const {addUser, removeUser, getUser, getUsersInRoom} = require('./users')

// let id = 0

app.use(express.json())


// const io = require('socket.io')(http, {
//     cors: {origin: '*'}
// }).listen(4002)


// io.on('connect', (socket) => {
  
//     socket.on('join', ({ name, room }, callback) => {
//       const { error, user } = addUser({ id: socket.id,name, room });
  
//       if(error) return callback(error);
  
//       socket.join(user.room);
  
//       socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
//       socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
  
//       io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
  
//       callback();
//     });
  
//      socket.on('sendMessage', (message, name, callback) => {
//       let user = getUser(name);
//       console.log(user)
  
//       io.to('as').emit('message', { user: 'mn', text: 'hey' });
  
//       // callbac k();
//     });
  
//     socket.on('disconnect', () => {
//       const user = removeUser(socket.id);
  
//       if(user) {
//         io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
//         io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
//       }
//     })
//   });



// io.on('connection', (socket) => {
//     // console.log('We have a new connection!')
    
//     socket.on('join', ({ name, room}, callback) => {
//         // console.log('id:' + id)
//         const {error, user} = addUser({id: socket.id, name: name, room: room})
  
        
//         console.log('room ' + user)
//         socket.emit('message', {user: 'admin', text: `${user.name}, welcome to ${user.room}`})
//         socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} has joined!`})

//         socket.join(user.room)

//         if(callback){
//             callback();
//         }else{
//             console.log('success i guess')
//         }
//     })
    
//     socket.on('sendMessage', (message, callback) => {
//         const user = getUser(socket.id)

//         // console.log('room1' + user.userInfo.room)

//         io.to(user.room).emit('message', {user: user.name, text: message})

//         callback()
       
//     })

//     socket.on('disconnect',  () => {
//         console.log('User has left!')
//     })
// })



app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 2
    }
  }))

massive({
    connectionString: CONNECTION_STRING2,
    ssl: {
        rejectUnauthorized: false
    }
})
.then(dbInstance => {
    app.set('db', dbInstance)
    app.listen(SERVER_PORT, () => console.log(`Server is bumping on ${SERVER_PORT}`))


})
.catch(err => console.log(err))


// const io = require('socket.io')(http, {
//     cors: {origin: '*'}
// }).listen(4002)

// io.on('connection', (socket) => {
//     console.log('a user connected')

//     socket.on('message' , (message) => {
//         console.log(message)
//         io.emit('message', ` ${socket.id.substr(0,2)} said ${message}`)
//     })
// })

//movie endpoints
app.get('/api/allMovies', movieCtrl.getAllMovies)
app.get('/api/getOne/:id', movieCtrl.getOneMovie)
app.post('/api/newRating', movieCtrl.putRating)

//rating endpoints
app.post('/api/getRating', movieCtrl.getRatingAndUser)
app.post('/api/avgRating', movieCtrl.avgRating)
app.post('/api/countRating', movieCtrl.countRating)
app.put('/api/updateRating', movieCtrl.updateRating)
app.delete('/api/deleteRating/:id', movieCtrl.deleteRating)

//auth endpoints
app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login);
app.delete('/auth/logout', authCtrl.logout);
app.get('/auth/getUserData', authCtrl.userData)

//socket.io
