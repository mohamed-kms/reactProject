import React, { Component } from 'react';
import _ from 'lodash';

import firebase from 'firebase';
import PluginAudio from "../PluginAudio";

class PluginShop extends Component {

    constructor(props) {
        super(props);

        this.state = {
            lastVisible: {},
            simplePlugin: {
                nom: null,
                image: null,
                resume: null
            },
            nbPluginDisplay: 2,
            morePlugin: false,
            query: '',
            pluginList: []
        }
    }

    onClickShowDetailPlugin(idPlugin) {
        this.setState({
            fireRedirect: true,
            id_: idPlugin
        });
    }

    paginationEvent() {
        console.log(this.state.pluginList.length ,"--- GETTING DATA ---", this.state.morePlugin);
        this.setState({
            morePlugin: true
        });
        console.log(this.state.pluginList.length ,"--- GETTING DATA ---", this.state.morePlugin);
    }

    searchPlugin = _.debounce (
        function () {
            var db = firebase.firestore();
            db.settings({
                timestampsInSnapshots: true
            });
            var first = db.collection("plugins");

            first.where("creator", "==", this.state.query).get()
                .then((querySnapshot) => {
                    var newPlugins = [];

                    querySnapshot.forEach((doc) => {
                        newPlugins.push({
                            "id": doc.id,
                            "name": doc.data().creator,
                            "description": doc.data().description,
                            "img": doc.data().url,
                        });
                    });
                    this.setState({
                        pluginList: newPlugins
                    });
                    console.log("=======>  "+this.state.query);
                    /*console.log("=====+>" + querySnapshot.docs.length + " ");*/
                })
                .catch((error) => {
                    console.log("Error : ", error);
            })
        }
    );

    handleChangeSearch(event) {
        const query = event.target.value;
        this.setState({ query },
            () => {
            if (!this.state.query.length) {
                this.setState(prevState => ({
                    restoList: prevState.restoList
                }));
            } else {
                this.searchPlugin();
            }
        });
    }

    fetchPlugin() {
        var db = firebase.firestore();
        db.settings({
            timestampsInSnapshots: true
        });

        var first = db.collection("plugins").limit(2);

        if (this.state.morePluginy) {
            var next = db.collection("plugins").startAfter(this.state.lastVisible).limit(2);
            console.log(this.state.pluginList.length ,"--- GETTING DATA ---", this.state.nbPluginDisplay);
            next.get().then((querySnapshot) => {
                let newPlugins = [];
                console.log("[next]:", this.state.lastVisible);
                querySnapshot.forEach((doc) => {
                    newPlugins.push({
                        "id" : doc.id,
                        "name" : doc.data().creator,
                        "description" : doc.data().description,
                        "img" : doc.data().url,
                    });
                });
                this.setState({
                    pluginList: this.state.pluginList.push(newPlugins),
                    lastVisible: querySnapshot.docs[querySnapshot.docs.length - 1],
                    nbPluginDisplay: 10,
                    morePlugin: false
                });
                /*console.log("=====+>"+querySnapshot.docs.length+" ");*/
            })
        } else {
            first.get().then((querySnapshot) => {
                var newPlugins = [];
                // Get the last visible document
                var lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
                console.log("[last]:", lastVisible);

                querySnapshot.forEach((doc) => {
                    newPlugins.push({
                        "id" : doc.id,
                        "name" : doc.data().creator,
                        "description" : doc.data().description,
                        "img" : doc.data().url,
                    });
                });
                this.setState({
                    pluginList: newPlugins,
                    lastVisible: lastVisible
                });
                /*console.log("=====+>"+querySnapshot.docs.length+" ");*/
            })
        }
    }

    componentDidMount() {
        this.fetchPlugin();
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

        return (
            <div>
                <div className="container text-center">
                    <div>
                        <h1>PLUGINS</h1>
                        <h5>Here be plugins</h5>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Search plugins"
                                   aria-label="Search plugins" aria-describedby="basic-addon2"
                            value={this.state.query}
                            onChange={this.handleChangeSearch.bind(this)}/>
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" type="button">Search</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="container mt-3">
                            <div className="card-columns">
                                {listPlugin}
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <h5 className="display-5 text-white text-center">Explore hundreds more on our Plugin page</h5>
                        <button
                            type="button"
                            className="btn btn-danger text-uppercase"
                            onClick={this.paginationEvent.bind(this)}
                        >Load More</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default PluginShop;