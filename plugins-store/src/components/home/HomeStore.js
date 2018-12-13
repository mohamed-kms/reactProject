import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
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

    onClickShowDetailPlugin(idPlugin) {
        console.log("[ID] " + idPlugin);
        this.setState({
            fireRedirect: true,
            id_: idPlugin
        });
    }

    getPlugins() {
        var db = firebase.database();
        db.ref("createurs").once('value').then((snapshot) => {
            let newPlugins = [];

            snapshot.forEach((childSnapshot) => {
                childSnapshot.forEach((listPlugin) => {
                    listPlugin.forEach((plug) => {
                        var inspiredby = plug.child("inspiredby").val();
                        var nom = plug.child("nom").val();
                        var image = plug.child("image").val();
                        newPlugins.push({
                            "id" : plug,
                            "name" : nom,
                            "description" : inspiredby,
                            "img" : image,
                        });
                    });
                    this.setState({
                        pluginList: newPlugins
                    });

                })

            })
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
                img={el.img}
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