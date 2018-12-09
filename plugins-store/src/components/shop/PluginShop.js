import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import firebase from 'firebase';
import PluginAudio from "../PluginAudio";

class PluginShop extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentPage: 0,
            lastPage: 0,
            lastVisible: {},
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

    paginationEvent(element) {
        let cnumber = parseInt(element.target.innerHTML) - 1;
        console.log("----->", cnumber);
        /*this.setState({
            currentPage: cnumber
        });*/
        this.state.currentPage = cnumber;

        this.fetchPlugin(this.state.currentPage, 2);

        if (element.target.id === 'thirdButton' || element.target.id === 'firstButton') {
            if (this.state.currentPage === 0 || this.state.currentPage === Math.ceil(this.state.totalPage / this.state.nbRestoPerPage)) {
                console.log("EXIST");
                return;
            }
            console.log("changing");
            document.querySelector('#firstButton').innerHTML = cnumber;
            document.querySelector('#secondButton').innerHTML = cnumber + 1;
            document.querySelector('#thirdButton').innerHTML = cnumber + 2;
        }
    }

    fetchPlugin(numPage, nbPerPage) {
        console.log(this.state.lastPage ,"--- GETTING DATA ---", this.state.currentPage);
        var db = firebase.firestore();
        db.settings({
            timestampsInSnapshots: true
        });

        var first = db.collection("plugins").limit(nbPerPage);

        if (this.state.lastPage < this.state.currentPage) {
            var next = db.collection("plugins").startAfter(this.state.lastVisible).limit(nbPerPage);
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
                    pluginList: newPlugins,
                    lastPage: numPage,
                    lastVisible: querySnapshot.docs[querySnapshot.docs.length - 1]
                });
                console.log("=====+>"+querySnapshot.docs.length+" ");
            })
        } else {
            first.get().then((querySnapshot) => {
                let newPlugins = [];
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
                    currentPage: numPage,
                    lastVisible: lastVisible
                });
                console.log("=====+>"+querySnapshot.docs.length+" ");
            })
        }
    }

    componentDidMount() {
        this.fetchPlugin(this.state.currentPage, 2);
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

        /*var showOne = {
            .card-columns {
                @include media-breakpoint-only(lg) {
                    column-count: 4;
                }
                @include media-breakpoint-only(xl) {
                    column-count: 5;
                }
            }
        }*/

        return (
            <div>
                <div className="container text-center">
                    <div>
                        <h1>PLUGINS</h1>
                        <h5>Here be plugins</h5>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Search plugins"
                                   aria-label="Search plugins" aria-describedby="basic-addon2"/>
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

                    <div className="navigation">
                        <div className="btn-toolbar">
                            <div className="btn-group mr-2">
                                <button type="button" className="btn btn-dark" id="firstButton" onClick={this.paginationEvent.bind(this)}>1</button>
                                <button type="button" className="btn btn-dark" id="secondButton" onClick={this.paginationEvent.bind(this)}>2</button>
                                <button type="button" className="btn btn-dark" id="thirdButton" onClick={this.paginationEvent.bind(this)}>3</button>
                                <button className="btn btn-light">...</button>
                                <button type="button" className="btn btn-dark" id="lastPageButton" onClick={this.paginationEvent.bind(this)}>{Math.ceil(this.state.totalPage / this.state.nbRestoPerPage)}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PluginShop;