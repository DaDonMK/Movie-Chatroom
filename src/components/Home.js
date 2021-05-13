import React, {Component} from 'react'
import axios from 'axios'
import Header from './Header'
import {Link} from 'react-router-dom'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default class Home extends Component{


    render(){
        return(
            <Header />
        )
    }
}