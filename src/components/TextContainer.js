import React from 'react'

const TextContainer = (props) => {

    let arr = []
    let len = props.users.length

    for(let i = 0; i < len; i++){
        arr.push(props.users[i].name)
    }
    return(
        <div>
            {arr.map((e,i) => { 
                console.log(e)
                return<div key={i}>
                    Users in room: <p className='in-room'>{e}</p>
                </div>
            })}
        </div>
    )

}

export default TextContainer