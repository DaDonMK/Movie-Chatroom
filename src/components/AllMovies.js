import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'
import Header from './Header'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()
export default class AllMovies extends Component{

    constructor(){
        super()

        this.state = {
            movies: []
        }
    }

    componentDidMount(){
        axios.get('/api/allMovies')
        .then(res => {
            console.log(res.data)
            this.setState({movies: res.data})
        })
    }

    render(){

        let mappedMovies = this.state.movies.map((element, i) => {
            return <div key={i}>
                <p>{element.title}</p>
                <Link to={`/movie/${element.movie_id}`}>
                <img src={element.image} alt='all-movies'/>
                </Link>
            </div>
        })

        return(
            <div>
                <Header />
                {mappedMovies}
            </div>
        )
    }
}