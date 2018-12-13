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
        var db = firebase.database();
        db.ref("createurs").once('value').then((snapshot) => {
//            console.log("[PARENT]", snapshot.val())
            snapshot.forEach((childSnapshot) => {
                var child = db.ref("createurs").child(childSnapshot.key).child("plugins").once("value")
//                console.log("[CHILD]", child);
                child.then((snapshot2) => {
                    snapshot2.forEach((childSnapshot2) => {
                        if (childSnapshot2.key === idPlugin) {
                            console.log("[]----_>", childSnapshot2.val());
                            this.setState({
                                myPlugin: {
                                    ...this.state.myPlugin,
                                    name: childSnapshot2.val()["nom"],
                                    link: childSnapshot2.val()["url"],
                                    picture: childSnapshot2.val()["image"],
                                    resume: childSnapshot2.val()["description"],
                                    arrayTags: childSnapshot2.val()["tags"],
                                    arrayConfig: null
                                }
                            });
                        } else {
                            console.log("No such document!");
                        }
                    })
                })
            })
        }).catch((error) => {
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
                                <img src={this.state.myPlugin.picture} width="auto" height="100%" alt=""/>
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