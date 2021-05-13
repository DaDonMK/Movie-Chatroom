import React, {useState, useEffect} from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import {Link} from 'react-router-dom'
import axios from 'axios'
import InfoBar from './InfoBar'
import ScrollToBottom from 'react-scroll-to-bottom'
import Input from './Input'
import Messages from './Messages'

const ChatRoom = ({location}) => {
    
    // const {name, room} = queryString.parse(location.search)
    // const [room, setRoom] = useState('')
    // const [name, setName] = useState('')
    // const [message, setMessage] = useState('') 
    // const [messages, setMessages] = useState([]) 
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    // const [id2, setid2] = useState(0)
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    
    const ENDPOINT = 'localhost:4002'
    
    let socket
    
    socket = io('ws://localhost:4002')
    useEffect(() => {
        // socket = io('ws://localhost:4002')
        let id = 1
        const {name, room} = queryString.parse(location.search)

        // const data = async () => {
            
        //     let res = await axios.get('auth/getUserData')
        //     console.log('x data: ' + res.data.x.first_name + res.data.x.last_name + res.data.id)
            
        //     id = res.data.id
        //     console.log('id ' +  id)


        //     socket.emit('join', {id, name, room})
            
        // }
        
        // data()
        setRoom(room);
        setName(name)

        // console.log('id2 ' +  id)

    
        // return () => {
        //     socket.emit('disconnet')

        //     socket.off()
        // }

        // setid2(id2 + 1)

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
    // console.log( message)


    // let z = []


    // if(messages.length === 1){

    //     messages.map((element, i) => {
    //         console.log(`welcome to ${room}, ${name}`)
    //         z.push(`welcome to ${room}, ${name}`)
    //         // return element
    //     })
        
//    if(messages.length > 1){

//         messages.map((element, i) => {

//             if(i === 0){
//                 console.log(`Welcome to ${room}, ${name}`)    

//             }else{
//                 console.log(element[0].user + ' says ' + element[0].text + i)
//                 z.push({'name': element[0].user, 'text': element[0].text})

//             }
//         })
//     }

    return(

        <div className="outerContainer">
      <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      {/* <TextContainer users={users}/> */}
    </div>
    )
        
        // <div className='outerContainer'>

            

        //     <div className='container'>
        //         <InfoBar room={room} />
        //         <Messages z={z} name={name}/>
        //         <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>






                /* {z.map((e,i) => {

                    if(i === 0){
                        return ''
                    }

                    return <div key={i}>
                        <ScrollToBottom>
                         {e}
                        </ScrollToBottom>
                    </div>
                })} */

               

    //         </div>
    //     </div>
        
    // )

}

export default ChatRoom