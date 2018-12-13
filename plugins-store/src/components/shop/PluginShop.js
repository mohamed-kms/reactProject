import React, { Component } from 'react';
import _ from 'lodash';

import firebase from 'firebase';
import PluginAudio2 from "../PluginAudio2";

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
            var db = firebase.database();
            var ref = db.ref("plugins");
            ref.once('value').then((snapshot) => {
                var newPlugins = [];
                snapshot.forEach((childSnapshot) => {
                    if (this.state.query.toLowerCase() === childSnapshot.val()["nom"].toLowerCase()) {
                        console.log("====== ",childSnapshot);
                        var inspiredby = childSnapshot.child("inspiredby").val();
                        var nom = childSnapshot.child("nom").val();
                        var image = childSnapshot.child("image").val();
                        newPlugins.push({
                            "id": childSnapshot,
                            "name": nom,
                            "img": image,
                            "inspiredby": inspiredby
                        })
                    }
                });
                this.setState({
                    pluginList: newPlugins
                });
                console.log("@@@@@ ", this.state.pluginList)
            });
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
        var db = firebase.database();
        db.ref("plugins").once('value').then((snapshot) => {
            let newPlugins = [];

            snapshot.forEach((childSnapshot) => {
                console.log("---->: ", childSnapshot);
                var inspiredby = childSnapshot.child("inspiredby").val();
                var nom = childSnapshot.child("nom").val();
                var image = childSnapshot.child("image").val();
                newPlugins.push({
                    "id" : childSnapshot,
                    "name" : nom,
                    "description" : inspiredby,
                    "img" : image,
                });
            });
            this.setState({
                pluginList: newPlugins
            });
        })

    }

    componentDidMount() {
        this.fetchPlugin();
    }

    render() {

        let listPlugin = this.state.pluginList.map((el, index) => {
            return <PluginAudio2
                id={el.id}
                name={el.name}
                img={el.img}
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