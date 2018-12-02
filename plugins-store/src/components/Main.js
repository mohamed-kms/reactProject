import React, { } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './home/HomeStore';
import Upload from './upload/AddPlugin';
import Login from './login/Login';
import Register from './register/Register';

function Main() {
    return (
        <div className="container mt-3">
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/add' component={Upload} isAuthed={true}/>
                <Route path='/login' component={Login}/>
                <Route path='/register' component={Register}/>
            </Switch>
        </div>
    );
}

export default Main;