let users = []

const express = require('express')
const app = express()

const http = require('http').createServer(app)

app.use(express.json())


const io = require('socket.io')(http, {
    cors: {origin: '*'}
}).listen(4002)


io.on('connection', (socket) => {
    // console.log('We have a new connection!')
    
    socket.on('join', ({name, room}, callback) => {
        // console.log('id:' + id)
        const {user} = addUser({id: socket.id, name: name, room: room})
  
        
        console.log('room ' + user)

        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
  

        socket.join(user.room)

        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})

        if(callback){
            callback();
        }else{
            console.log('success i guess')
        }
    })
    
    socket.on('sendMessage', (message, name, callback) => {
        const user = getUser(name)

        console.log(user)

        io.to(user.room).emit('message', {user: user.name, text: message})
        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})


if(callback){
            callback();
        }else{
            console.log('success i guess')
        }       
    })

    socket.on('disconnect',  () => {
        const user = removeUser(socket.id)

        if(user){
            io.to(user.room).emit('message', {'user': 'admin', 'text': `${user.name} has left.`})
        }
    })
})



    
const addUser =  ({id2, id, name, room}) => {

    name = name.trim().toLowerCase();
    // name = name.replace(/^\s+/, '')
    room = room.trim().toLowerCase();

    console.log(name)

    const existingUser = users.find((user) => user.room === room && user.name === name);

    if(!name || !room) return { error: 'Username and room are required.' };
    if(existingUser) return { error: 'Username is taken.' };

    const user = {id2, id, name, room };

    users.push(user);

    return { user };
        
      
    }
    
    const removeUser = (id) => {
        
        const index = users.findIndex((user) => user.id === id)
    
        if(index !== -1){
            return users.splice(index, 1)[0]
        }
    };
    
   
     let getUser = (name) => { 
        console.log(name)
        // users.map((e,i) => {
        //     if(e.name === name){
        //         console.log(e)
        //         return e
        //      }
        // })
        // return 5
        return users.find((user) => user.name === name)
    };

    const getUsersInRoom = (room) => users.filter((user) => user.room === room);



module.exports = {addUser, removeUser, getUser, getUsersInRoom}