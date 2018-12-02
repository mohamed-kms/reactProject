import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import firebase from 'firebase';
import PluginAudio from './../PluginAudio';
import DetailsPluginAudio from './../Details';

class HomeStore extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id_: '',
            fireRedirect: false,
            simplePlugin: {
                nom: null,
                image: null,
                resume: null
            },
            pluginList: []
        }
    }
    //var test = '';
    /*firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            user.getIdToken(true)
                .then(function (idToken) {
                    // Send token to your backend via HTTPS
                    //
                    test = idToken;
                    console.log("[TOKEN]--> "+test);
                })
                .catch(function (error) {
                    // Handle error
                });
        }
    });*/

    /*
    let creator = '';
    firebase.database().ref('/plugins').once('value')
        .then(function (snapshot) {
            var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
            console.log("----->"+snapshot.val().plugin.nomCreateur);
            console.log("----->"+JSON.stringify(snapshot.val().plugin));
        }).catch((error) => {
            console.log("----->"+error);
        });

    var db = firebase.firestore();
    db.settings({
        timestampsInSnapshots: true
    });

    db.collection("plugins").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log("=====+>"+doc.id+" "+JSON.stringify(doc.data()));
        })
    });*/

    onClickShowDetailPlugin(idPlugin) {
        console.log("[ID] " + idPlugin);
        this.setState({
            fireRedirect: true,
            id_: idPlugin
        });
    }

    getPlugins() {
        console.log("--- GETTING DATA ---");
        var db = firebase.firestore();
        db.settings({
            timestampsInSnapshots: true
        });
        db.collection("plugins").get().then((querySnapshot) => {
            let newPlugins = [];
            querySnapshot.forEach((doc) => {
                console.log("=====+>"+doc.id+" "+JSON.stringify(doc.data()));
                console.log("=====+>"+doc.id+" ++++ "+doc.data().creator);
                for (var n in doc.data()) {
                    console.log("*******>"+n+" ");
                }
                newPlugins.push({
                    "id" : doc.id,
                    "name" : doc.data().creator,
                    "description" : doc.data().description,
                    "img" : doc.data().url,
                });
            });
            this.setState({
                pluginList: newPlugins
            });
            console.log("=====+>"+querySnapshot.docs.length+" ");
        })
    }

    componentDidMount() {
        this.getPlugins();
    }

    render() {

        let listPlugin = this.state.pluginList.map((el, index) => {
            return <PluginAudio
                id={el.id}
                name={el.name}
                description={el.description}
                key={index}
                showDetailPlugin={this.onClickShowDetailPlugin.bind(this)}
            />
        });

        if (this.state.fireRedirect) {
            let id = this.state.id_;
            return (
                <Redirect from='/' to={'/details:'+id} compenent={DetailsPluginAudio}/>
            )
        }

        return (
            <div>
                <div className="card-columns">
                    {listPlugin}
                </div>
            </div>
        );
    }
}
export default HomeStore;