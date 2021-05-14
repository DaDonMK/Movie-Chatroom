import React from 'react'
import {HashRouter} from 'react-router-dom';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {loginUser, logoutUser} from './../ducks/loggedInReducer'
import {getName} from './../ducks/fullNameReducer'
import axios from 'axios'
import {useState, useEffect} from 'react'
import SearchBar from './SearchBar'


const Header = (props) => {


    const [name, setname] = useState([])


      useEffect( () =>{
        console.log('HEADER LOADED')
        axios.get('/auth/getUserData')
        .then(res => {
            if(res.data.x.first_name){
                console.log('user data ' + res.data.x.user_username)

                props.loginUser(res.data.x.user_username)

                let first_name = res.data.x.first_name
                let last_name = res.data.x.last_name
                let full_name = first_name + ' ' + last_name

                props.getName(full_name)

                setname('yes')

            }else{
                console.log('data not coming in!!!!')

            }
        }).catch(err=>{
            console.log('error in HELLO')
            setname('no')
           
        })

    }, [])
    
    function logout(){
        console.log('logout')
        axios.delete('/auth/logout')
        .then(res => {
            setname('no')
            props.logoutUser()
            console.log('logout in header ' + props.logg)
            props.history.push('/')
        }
        )
        .catch(err => console.log(err))
        // window.location.reload()   
     }


    
    function Hello(inp){
        console.log(inp)
   
         if(name === 'yes'){
            
            console.log('full name ' + props.giveMeName.name)
            return <div className='cart-header'>
            <p className='name'>Looking Good, {props.giveMeName.name}!</p>
            <Link className='links' to='/'>
            <button className='logout-button' onClick={logout}>LogOut</button>
             </Link>
             <Link className='links' to='/chatHome'>
             Chatroom
             </Link>

            </div>
        }
        
        else if (name === 'no'){
            console.log('noooo')
            return <Link className='links' to='/auth'>
            Login/Register
             </Link>
         }


    }
    

        return(
            <HashRouter>

            <div className='full-header'>


            <div className='Header'>
    
            
            {/* <h1 id='title'>GENERIC APP NAME</h1> */}
             {Hello('yes')}
            
            </div>

            <nav>
                <Link to='/'> 
                    Home
                </Link >
    
                <Link to='/movies'>
                    All Movies
                </Link>
                </nav>
           
            </div>

            <SearchBar />
    
            </HashRouter>
        )
}


function mapStateToProps(state) {

    return({ 
      logg: state.logg,
      giveMeName: state.giveMeName
    })
  }
  
  export default connect(mapStateToProps, { loginUser, logoutUser, getName })(Header)