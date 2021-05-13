import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {loginUser, logoutUser} from './../ducks/loggedInReducer'
import {getName} from './../ducks/fullNameReducer'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()
class AuthReg extends Component{

    constructor(){
        super()

        this.state = {
            user: {},
            userName: {},
            name: '',
            username: '',
            password: '',
            first_name: '',
            last_name: '',
            loggedIn: false,
            fullName: ''
        }

        this.usernameInput=this.usernameInput.bind(this)
        this.passwordInput=this.passwordInput.bind(this)
        this.register=this.register.bind(this)
        this.firstName=this.firstName.bind(this)
        this.lastName=this.lastName.bind(this)
        // this.check=this.check.bind(this)
    }

    usernameInput(inp){
        this.setState({ username: inp });
    }

    passwordInput(inp){
        this.setState({ password: inp });
    }

    firstName(inp){
      this.setState({first_name: inp})
    }

    lastName(inp){
      this.setState({last_name: inp})
    }
    
    register(){
        // console.log
        const { username, password, first_name, last_name } = this.state
        console.log(username, password, first_name, last_name )
          axios.post('/auth/register', {username, password, first_name, last_name})
      .then(res => {
        console.log(res.data.newUser.id)
        this.setState({ username: username, password: password, user: res.data.newUser, userName: res.data.newUser2, first_name: res.data.newUser2.first_name, last_name: res.data.newUser2.last_name});
        this.props.loginUser(username)
        
        this.setState({fullName: this.state.first_name + ' ' + this.state.last_name})
        
        this.props.getName(this.state.fullName)
        
        console.log('full name from register: ' + this.props.giveMeName.name)
        this.props.history.push('/')
      })
      .catch(err => {
        console.log('it dont')       
      })
    }


    render(){
        return(
            <div className="loginContainer">
              <ToastContainer />
                <div className="title">Register</div>

                <input type='text' placeholder="First Name" value={this.state.first_name} onChange={e => this.firstName(e.target.value)}/>
                <input type='text' placeholder="Last Name" value={this.state.last_name} onChange={e => this.lastName(e.target.value)}/>
                <input type='text' placeholder="Username" value={this.state.username} onChange={e => this.usernameInput(e.target.value)} />
                <input type='password' placeholder="Password" value={this.state.password} onChange={e => this.passwordInput(e.target.value)}/>
            <button onClick={this.register}>SUBMIT</button>
           
          </div>
        )
    }
}


function mapStateToProps(state) {

    return({ 
      logg: state.logg,
      giveMeName: state.giveMeName
    })
  }
  
  export default connect(mapStateToProps, { loginUser, logoutUser, getName })(AuthReg)