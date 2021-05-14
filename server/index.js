require('dotenv').config()

const{CONNECTION_STRING2, SERVER_PORT, SESSION_SECRET} = process.env

const massive = require('massive')
const express = require('express')
const app = express()


const http = require('http').createServer(app)

const session = require('express-session')


const authCtrl = require('./controllers/authCtrl');
const movieCtrl = require('./controllers/movieCtrl')
// const {addUser, removeUser, getUser, getUsersInRoom} = require('./users')

// let id = 0

app.use(express.json())



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
