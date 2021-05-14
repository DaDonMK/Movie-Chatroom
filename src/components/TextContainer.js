import React from 'react'

const TextContainer = (props) => {

    let arr = []
    let len = props.users.length
    // console.log(props.users.length)
    for(let i = 0; i < len; i++){
        // console.log(props.users[i].name)
        arr.push(props.users[i].name)
    }
    // console.log(arr)
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