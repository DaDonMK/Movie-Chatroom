import React from "react";
import {Switch, Route} from 'react-router-dom';
import {HashRouter} from 'react-router-dom';
import Auth from './components/Auth'
import LogOrReg from './components/LogOrReg'
import AuthReg from './components/AuthReg'
import Header from './components/Header'
import AllMovies from './components/AllMovies'
import OneMovie from './components/OneMovie'
import ChatHome from './components/Chat-Home'
import ChatRoom from './components/Chat-Room'

export default(
    <HashRouter>
    <Switch>

        <Route exact path='/' component={Header}/>
        <Route path='/auth' component={LogOrReg}/>
        <Route path='/register' component={AuthReg}/>
        <Route path='/login' component={Auth}/>
        <Route path='/movies' component={AllMovies}/>
        <Route path='/movie/:id' component={OneMovie}/>
        <Route path='/chatHome' component={ChatHome}/>
        <Route path='/chatRoom' component={ChatRoom}/>


    </Switch>
    </HashRouter>
)