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
        debugger;
        this.setState({
            fireRedirect: true,
            id_: idPlugin
        });
    }

    getPlugins() {
        console.log("--- GETTING DATA ---");
        var db = firebase.database();
        // db.settings({
        //     timestampsInSnapshots: true
        // });
        db.ref("createurs").once('value').then((snapshot) => {
                    let newPlugins = [];

            snapshot.forEach((childSnapshot) => {
                childSnapshot.forEach((listPlugin) => {
                    listPlugin.forEach((plug) => {
                        var inspiredby = plug.child("inspiredby").val();
                        var nom = plug.child("nom").val();
                        var image = plug.child("image").val();
                        console.log("L'url de l'image est" + image)
                        newPlugins.push({
                                        "id" : plug,
                                        "name" : nom,
                                        "description" : inspiredby,
                                        "img" : image,
                                    });
                    
                    })
                    this.setState({
                                pluginList: newPlugins
                            });
                    
                    // var description = listPlugin.child(listPlugin.key).val();
                    // console.log(listPlugin.hasChild("bigMuff"))
                    // console.log(listPlugin.val())    
                })
                //var description = childSnapshot.child("plugins").val().child("description").val();

                //console.log(description);
            })// var createurs = snapshot.val();
            // for(var creator in createurs){
            //     console.log(creator.child("plugins"))
            // }
        // })   .collection("plugins").get().then((querySnapshot) => {
        //     let newPlugins = [];
        //     querySnapshot.forEach((doc) => {
        //         console.log("=====+>"+doc.id+" "+JSON.stringify(doc.data()));
        //         console.log("=====+>"+doc.id+" ++++ "+doc.data().creator);
        //         for (var n in doc.data()) {
        //             console.log("*******>"+n+" ");
        //         }
        //         newPlugins.push({
        //             "id" : doc.id,
        //             "name" : doc.data().creator,
        //             "description" : doc.data().description,
        //             "img" : doc.data().url,
        //         });
        //     });
        //     this.setState({
        //         pluginList: newPlugins
        //     });
      //console.log("=====+>"+querySnapshot.docs.length+" ");
        })
    }

    componentDidMount() {
        this.getPlugins();
    }

    render() {

        let listPlugin = this.state.pluginList.map((el, index) => {
            console.log("-----> "+el.id);
            return <PluginAudio
                id={el.id}
                name={el.name}
                img={el.img}
                description={el.description}
                key={index}
                showDetailPlugin={this.onClickShowDetailPlugin.bind(this)}
            />
        });

        /*if (this.state.fireRedirect) {
            let id = this.state.id_;
            return (
                <Redirect from='/' to={'/details:'+id} compenent={DetailsPluginAudio}/>
            )
        }*/

        return (
            <div style={{backgroundColor: '#333333'}}>
                <div className="jumbotron jumbotron-fluid" style={{backgroundImage: 'url(https://www.moddevices.com/hubfs/assets/billboards/home-billboard.jpg)'}}>
                    <div className="container">
                        <h1 className="display-4 font-weight-bold text-white">For all purposes, an entire sonic universe inside</h1>
                        <h3 className="font-weight-normal text-white">Get access to more than five hundred audio and MIDI plugins in a collection that will never stop growing</h3>
                    </div>
                </div>

                <h1 className="display-4 font-weight-bold text-white text-center">Inspiration in all the Classics</h1>
                <h5 className="font-weight-normal text-white text-center">All the famous stompboxes, FX, synths, sequencers and amps that made history</h5>

                <div className="container mt-3">
                    <div className="card-columns">
                        {listPlugin}
                    </div>
                </div>

                <div className="text-center">
                    <h5 className="display-5 text-white text-center">Explore hundreds more on our Plugin page</h5>
                    <Route
                        render={({ history }) => (
                            <button
                                type="button"
                                className="btn btn-outline-danger text-uppercase"
                                onClick={() => { history.push("/plugin-show") }}
                            >Go to plugin shop</button>
                        )}
                    />
                </div>
            </div>
        );
    }
}
export default HomeStore;