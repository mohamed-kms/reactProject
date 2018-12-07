import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import firebase from "firebase";

import queryString from 'query-string'

class Details extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: ''
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
                    console.log("[]" + doc.id + " " + JSON.stringify(doc.data()));
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
            <div>
                <p>ToDo : new Query with this id : {this.state.id}</p>
            </div>
        );
    }

}

export default Details;