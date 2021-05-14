import React from 'react'

const InfoBar = ({room}) => (

    <div className='infoBar'>
        <div className='leftInnerContainer'>
            <h3 className='top-room'>{room}</h3>
            <a href='/#/chatHome'>Back</a>
        </div>
    </div>
)

export default InfoBar