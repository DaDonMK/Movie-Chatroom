import React from 'react';


import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{trimmedName}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
            </div>
            <p className="sentText pl-10 ">{user}</p>
          </div>
        )
  );
}

export default Message;



// import React from 'react'
// import ScrollToBottom from 'react-scroll-to-bottom'

// const Message = ({out ,name}) => {

//     let isSentbyCurrentUser = false

//     // const trimmedName = name.trim().toLowerCase()

//     // if(message.user === name){
//     //     isSentbyCurrentUser = true
//     // }

//     console.log(name, out, out[0])

//     return(
//         isSentbyCurrentUser 
//         ? (
//             <div className='messageContainer justifyEnd'>
//                 <div className='messageBox backgroundBlue'>
//                      <p className='sentText pr-10'>{name}</p>
//                     <p className='messageText colorWhite'>{out[0].text}</p>
//                 </div>
//             </div>
//         ) 
//         : (
//             <div className='messageContainer justifyStart'>
//                 <div className='messageBox backgroundLight'>
//                     <p className='messageText colorDark'>{out[0].text}</p>
//                 </div>
//                 <p className='sentText pl-10'>{out[0].text}</p>
//             </div>
//         )
//         // <h1></h1>
//     )

// }

// export default Message