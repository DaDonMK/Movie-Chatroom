import React from 'react'
import {HashRouter} from 'react-router-dom';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {loginUser, logoutUser} from './../ducks/loggedInReducer'
import {getName} from './../ducks/fullNameReducer'
import axios from 'axios'
import {useState, useEffect} from 'react'
import { Component } from 'react';

export default class SearchBar extends Component{

    constructor(){
        super()

        this.state = {
            input: '',
            movies: []
        }

        this.handleInput=this.handleInput.bind(this)
        this.reload=this.reload.bind(this)
    }

    componentDidMount(){
        axios.get('/api/allMovies')
        .then(res => {
            this.setState({movies: res.data})
            console.log(this.state.movies)
        })
    }


    handleInput(val){
        this.setState({input: val})
    }

    reload(){
        this.setState({input: ''})
    }

    render(){


        let moviesMapped = this.state.movies.filter((element, i) => {
            return element.title.toLowerCase().includes(this.state.input.toLowerCase())

        })
        console.log(moviesMapped)
        // console.log(moviesMapped[0])

        let moviesMapped2 = moviesMapped.map((e, i) => {
            if(this.state.input === ''){
                return ''
            }else{
                return <div className= 'search-drop' key={i}>
                    {/* <p>{e.movie_id}</p> */}
                   <Link to={`/movie/${e.movie_id}`} onClick={this.reload}>
                       <p>{e.title}</p>
                       </Link> 
                   {/* {window.location.reload()} */}
    
                </div>
            }
        })
        console.log(moviesMapped2)


        return(
            <div className='search-box'>
                <input onChange={event => this.handleInput(event.target.value)} value={this.state.input} type='text' placeholder='search'/>
                {/* <section className='search-drop'> */}
                    {moviesMapped2}
                {/* </section> */}
            </div>
        )
    }


}