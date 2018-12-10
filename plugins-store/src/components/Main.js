import React, { } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './home/HomeStore';
import Upload from './upload/AddPlugin';
import Login from './login/Login';
import Register from './register/Register';
import PluginShow from './shop/PluginShop';
import Detail from './Details';

function Main() {
    return (
        <div>
            <div>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/add' component={Upload} isAuthed={true}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={Register}/>
                    <Route path='/plugin-show' component={PluginShow}/>
                    <Route path='/detail' component={Detail}/>
                </Switch>
            </div>
        </div>
    );
}

export default Main;