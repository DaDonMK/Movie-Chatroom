import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'
import Header from './Header'
import 'react-toastify/dist/ReactToastify.css'
import Youtube from './Youtube'

toast.configure()
export default class OneMovie extends Component{

    constructor(){
        super()

        this.state={
            oneMovie: [],
            input: 0,
            rating: 0,
            id: 0,
            avg_rating: 0,
            rating_count: 0,
            params_id: 0
        }

        this.handleInput=this.handleInput.bind(this)
        this.setRating=this.setRating.bind(this)
        this.getRatingAndUser=this.getRatingAndUser.bind(this)
        this.updateRating=this.updateRating.bind(this)
        this.delete=this.delete.bind(this)
    }

    async componentDidMount(){
        // window.location.reload()
        const res = await axios.get(`/api/getOne/${this.props.match.params.id}`)
        this.setState({params_id: this.props.match.params.id}) 

        console.log('x is: ' + this.state.params_id)

        this.setState({oneMovie: res.data})
        this.setState({id: res.data[0].movie_id})

        console.log('id ' + this.state.id)

        const response = await axios.post('/api/avgRating',  {movie_id: this.state.id})
        this.setState({avg_rating: Math.round(response.data.avg*10)})
        console.log('average1 is: ' + this.state.avg_rating )

    }

    handleInput(val){
        this.setState({input: val})
    }

    async setRating(){
       
        console.log(this.state.id)
        const res = await axios.post('/api/newRating', {rate: this.state.input, movie_id: this.state.id})
        
        this.setState({rating : res.data.insert.rating})
        console.log('setrating ' + this.state.rating)


        const response = await axios.post('/api/avgRating', {movie_id: this.state.id})
        this.setState({avg_rating: Math.round(response.data.avg*10)})
        console.log('avg: ' + response.data.avg)

    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevState.avg_rating !== this.state.avg_rating) {
          console.log('state has changed.')
        }else{
            console.log('state hasnt at all changed.')

        }
        console.log('id :' + prevState.params_id  + ' ' + this.props.match.params.id)

        if(prevState.params_id !== this.props.match.params.id){

            const res = await axios.get(`/api/getOne/${this.props.match.params.id}`)

            this.setState({params_id: this.props.match.params.id}) 

            console.log('x is: ' + this.state.params_id)

            this.setState({oneMovie: res.data})
            this.setState({id: res.data[0].movie_id})

            console.log('id has changed.' + prevState.params_id  + ' ' + this.props.match.params.id)

        }else{
            console.log('id has not changed.')
        }
      }

    getRatingAndUser(){
        axios.post('/api/getRating/', {movie_id: this.state.id})
        .then(res => {
            console.log(res.data)

            let x = res.data.userAndRating
            console.log({x})

            if(x === undefined || x === null || x === null){
                console.log('no rating set')
                toast.error('NO RATING SET')
            }else{
                
                let z = res.data.userAndRating
                let y = res.data.userAndRating.rating

                console.log({z})
                console.log({y})

                toast.success('RATING SET: ' + y)
            }
        })
    }


    async delete(){
        let id = this.state.id
        const res = await axios.delete(`/api/deleteRating/${id}`)
        console.log('deleteRating: ' + res.data.del)
        this.setState({rating: null})
        toast.error('RATING DELETED')
   
        const response = await axios.post('/api/avgRating',  {movie_id: this.state.id})
        this.setState({avg_rating: Math.round(response.data.avg*10)})
        console.log('average1 is: ' + this.state.avg_rating )
    
    }


    async updateRating(){

        const res = await axios.put('/api/updateRating', {movie_id: this.state.id, rating: this.state.input})
        console.log(res.data[0].rating)
        this.setState({rating: res.data[0].rating})

        const response = await axios.post('/api/avgRating', {movie_id: this.state.id}) 
        console.log('avg update: ' + response.data.avg)
        this.setState({avg_rating: Math.round(response.data.avg*10)})
    }

    render(){

          let oneMovieMapped = this.state.oneMovie.map((element, i) => {
              console.log(element)
              return <div key={i}>
                <h1>{element.title}</h1>
                <img src={element.image} alt='oneMovie'/>
                <input type='integer' onChange = {(event) => this.handleInput(event.target.value)}></input>
                <button onClick={this.setRating}>Set Rating</button> 
                <button onClick={this.getRatingAndUser}>Get Rating</button>
                <button onClick={this.updateRating}>Update Rating</button>
                <button onClick={this.delete}>Delete Rating</button>

                <Youtube movie = {element.movie_id}/>

              </div>
          })

        return(
            <div>
                <Header />
                <h2>{this.state.avg_rating}%</h2>
                {oneMovieMapped}
            </div>
        )
    }
}