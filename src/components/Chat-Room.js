import React, {useState, useEffect} from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import InfoBar from './InfoBar'
import Input from './Input'
import Messages from './Messages'
import {connect} from 'react-redux'
import {loginUser, logoutUser} from './../ducks/loggedInReducer'
import {getName} from './../ducks/fullNameReducer'
import TextContainer from './TextContainer'

const ChatRoom = ({location}) => {
     
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    
    const ENDPOINT = 'localhost:4002'
    
    let socket
    
    socket = io('ws://localhost:4002')
    useEffect(() => {
        let { name, room} = queryString.parse(location.search)


        setName(name)
        setRoom(room)
            console.log(name)
            
        socket.emit('join', { name, room }, (error) => {
            if(error) {
            alert(error);
                }
        });


    }, [ENDPOINT, location.search])

    useEffect(() => {
        socket.on('message',  (message) => {
            // messages.push([message])
            
            setMessages(messages => [ ...messages, message ]);

        })
        
        
        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });
    }, []);
    

    const sendMessage = (event) => {
        event.preventDefault()

        if(message){
            socket.emit('sendMessage', message, name, () => setMessage(''))
        }
    }

    console.log( messages)
    

    return(

        <div className="outerContainer">
      <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer users={users}/>
    </div>
    )
        
    }


function mapStateToProps(state) {

    return({ 
      logg: state.logg,
      giveMeName: state.giveMeName
    })
  }

export default connect(mapStateToProps, { loginUser, logoutUser, getName })(ChatRoom)


