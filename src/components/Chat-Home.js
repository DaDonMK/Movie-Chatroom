import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {connect} from 'react-redux'
import {loginUser, logoutUser} from './../ducks/loggedInReducer'
import {getName} from './../ducks/fullNameReducer'

// import './Join.css';

export default function ChatHome() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
        </div>
        <div>
          <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} />
        </div>
        <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chatRoom?name=${name}&room=${room}`}>
          <button className={'button mt-20'} type="submit">Sign In</button>
        </Link>
      </div>
    </div>
  );
}






// import React, {useState, useEffect} from 'react'
// import queryString from 'query-string'
// import axios from 'axios'
// import {Link} from 'react-router-dom'
// import io from 'socket.io-client'
// import {connect} from 'react-redux'
// import {loginUser, logoutUser} from './../ducks/loggedInReducer'
// import {getName} from './../ducks/fullNameReducer'
// import Header from './Header'

// const ChatHome  = (props) => {

//     const [name, setName] = useState('')
//     const [room, setRoom] = useState('')
//     const [log, setLog] = useState('')


//     // const Check = (inp) => {

//     //     console.log('logged in: ' + props.logg.loggedIn)
//     //     console.log('name: ' + props.giveMeName.name)

//     //     if(props.logg.loggedIn === true){
//     //         setLog('yes')
//     //         let name = props.giveMeName.name.trim()
//     //         console.log('name trimmed: ' + name)
//     //         setName(name)
//     //     }else{
//     //         setName(null)
//     //         setLog('no')
//     //     }

        
//     // }


//     useEffect(() => {

//         axios.get('/auth/getUserData')
//         .then(res => {
//             let first_name = res.data.x.first_name
//             let last_name = res.data.x.last_name
//             let full_name = first_name + last_name

//             setLog('yes')
//             setName(full_name)
//             console.log(full_name)
//         })
//         .catch(err =>{
//             setName(null)
//             setLog('no')
//             console.log('error in getuserdata: ' + err)
//         })


//     }, [])

    

//     // props.getName(full_name)

//     return(
//         <div>
//             <Header />
//             {/* <input placeholder='' className='joinInput' type='text' onChange={(event) => setName(event.target.value)}/> */}
//             <input placeholder='Room' className='joinInput mt-20' type='text' onChange={(event) => setRoom(event.target.value)}/>

//         <Link onClick={event => (!name || !room || name === null || log === false) ? event.preventDefault() : null} to={`/chatRoom?name=${name}&room=${room}`}>
//             <button className='button mt-20'>Sign In</button>
//         </Link>
//         </div>
//     )
// }

// function mapStateToProps(state) {

//     return({ 
//       logg: state.logg,
//       giveMeName: state.giveMeName
//     })
//   }

// export default connect(mapStateToProps, { loginUser, logoutUser, getName })(ChatHome)
// // export default ChatHome