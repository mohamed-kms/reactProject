import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import Header from "./components/Header";
import Header2 from "./components/Header2";
import Main from "./components/Main";
import firebase from 'firebase';

// import PluginAudio from './components/PluginAudio';


class App extends Component {

    render() {
        let showHeader;

        const user = firebase.auth().currentUser;
        if (user) {
            showHeader = <Header/>
        } else {
            showHeader = <Header2/>
        }

        return (
            <div className="">
                {showHeader}
                <Main/>
            </div>
        );
    }
}

export default App;
