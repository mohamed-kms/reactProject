import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import firebase from "firebase";

import queryString from 'query-string'

class Details extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            myPlugin: {
                name: null,
                link: null,
                title: null,
                picture: null,
                resume: null,
                arrayTags: null,
                arrayConfig: null
            }
        }
    }

    getMoreInfo(idPlugin) {
        var db = firebase.firestore();
        db.settings({
            timestampsInSnapshots: true
        });
        db.collection("plugins").doc(idPlugin)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    console.log("[PLUGIN]:" + doc.id + " " + JSON.stringify(doc.data()));
                    /*for (var n in doc.data()) {
                        console.log("[PLUGIN]:" + n + " ------ " + doc.data()[n]);
                    }*/
                    this.setState({
                        myPlugin: {
                            ...this.state.myPlugin,
                            name: doc.data()["creator"],
                            link: doc.data()["url"],
                            picture: doc.data()["image"],
                            resume: doc.data()["description"],
                            arrayTags: doc.data()["tags"],
                            arrayConfig: null
                        }
                    });
                } else {
                    console.log("No such document!");
                }
            })
            .catch((error) => {
                console.log("Error getting document:", error);
            });
    }

    componentDidMount() {
        const values = queryString.parse(this.props.location.search);
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        const id_ = params.get('id');
        console.log("[DETAILS]:"+id_);
        this.setState({
            id: id_
        });
        this.getMoreInfo(id_);
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="">
                        <div className="card shadow p-3 mb-5 rounded">
                            <div className="card-body">
                                <h5 className="card-title">{this.state.myPlugin.name}</h5>
                                <p>{this.state.myPlugin.resume}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Details;