import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import * as firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDGv2BxGZIrgL_nDscbAuZYFXR9ZubeYGQ",
    authDomain: "grace-plugins-store.firebaseapp.com",
    databaseURL: "https://grace-plugins-store.firebaseio.com",
    projectId: "grace-plugins-store",
    storageBucket: "grace-plugins-store.appspot.com",
    messagingSenderId: "463039502844"
};
firebase.initializeApp(config);

ReactDOM.render(
    (<BrowserRouter>
        <App />
    </BrowserRouter>), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
