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