import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message';


const Messages = ({ messages, name }) => (
  <ScrollToBottom className="messages">
    {messages.map((message, i) => <div key={i}><Message message={message} name={name}/></div>)}
  </ScrollToBottom>
);

export default Messages;



// import React, {useState} from 'react'
// import { isElement } from 'react-dom/test-utils'
// import ScrollToBottom from 'react-scroll-to-bottom'
// import Message from './Message'
// // if(messages.length >= 1){

// //     messages.map((element, i) => {
// //         console.log(element[0].text)
// //         return<div>
// //             {element[0].text}
// //         </div>
// //     })
// // }

// const Messages = ({z, name}) => {
    
//     // let x = [{'text': 5}, {'hello'6}] 

//     // const [msg, setMsg] = useState([])
//     // let z = 0
//     // let msg = []

//     // let len = messages.length
    
//     // let messageText = ''
//     // let messageUser = ''

//     // msg.push(messages)
    
    
//     let isSentbyCurrentUser = false


//     // msg.push(user, text)
//     // setMsg(user, text)

//     console.log(z)
    
    
    
//     return(
//         <div>
            
           
//         {z.map((e,i) => {
//             return <div className='messageContainer justifyEnd' key={i}>
//             <div className='messageBox backgroundBlue'>
//                 <ScrollToBottom className='messages'>
//                     <p className='sentText pr-10'>{e.name}</p>
//                     <p className='messageText colorWhite'> {e.text}</p>
//                 </ScrollToBottom>
//             </div>
//         </div>
            
//         //     if(e.name === name){
//         //        isSentbyCurrentUser = true
//         //    }

//         //    if(isSentbyCurrentUser === true){
//         //             return <div className='messageContainer justifyEnd' key={i}>
//         //             <div className='messageBox backgroundBlue'>
//         //                 <ScrollToBottom className='messages'>
//         //                     <p className='sentText pr-10'>{e.name}</p>
//         //                     <p className='messageText colorWhite'> {e.text}</p>
//         //                 </ScrollToBottom>
//         //             </div>
//         //         </div>

//         //    }else{


//         //     return <div className='messageContainer justifyStart'>
//         //         <div className='messageBox backgroundLight'>
//         //         <ScrollToBottom className='messages'>
//         //             <p className='messageText colorDark'>{e.name}</p>
//         //             <p className='sentText pl-10'>{e.text}</p>
//         //         </ScrollToBottom>
//         //         </div>
//         //     </div>


//         //    }




//                         //  {`${name} says ${e.text}`}



//                 })}


//          </div>
        
//     )
// }

// export default Messages