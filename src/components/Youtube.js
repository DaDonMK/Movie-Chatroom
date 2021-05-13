import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'
import Header from './Header'
import 'react-toastify/dist/ReactToastify.css'
import YouTube from 'react-youtube'

toast.configure()

export default class Youtube extends Component{

    videoOnReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
        console.log(event.target)
    }

    render(){
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };

    let video = ''
    console.log(this.props.movie)
    if(this.props.movie === 1){
        video = "FydTRC77cB4"
    }else if(this.props.movie === 2){
        video = "odM92ap8_c0"
    }else if(this.props.movie === 3){
        video = "AZGcmvrTX9M"
    }

    // video = "FydTRC77cB4"

    //  videoId = "2g811Eo7K8U"
    // let videoID = {video}
    return (

    <YouTube 
            videoId = {video}
            opts = {opts} 
            onReady = {this.videoOnReady} 
    />
    )
  }

  
}
    
