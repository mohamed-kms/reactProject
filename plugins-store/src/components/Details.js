import React, { Component } from 'react';
import firebase from "firebase";
import SettingView from './SettingView'

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
                arrayConfig: null,
                configs: [],
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
                            let listConfig = [];
                            if (childSnapshot2.val()["configs"]) {
                                childSnapshot2.val()["configs"].forEach((elt) => {
                                    listConfig.push({
                                        "control": elt.control,
                                        "default": elt.default,
                                        "min": elt.min,
                                        "max": elt.max
                                    })
                                });
                            }
                            this.setState({
                                myPlugin: {
                                    ...this.state.myPlugin,
                                    name: childSnapshot2.val()["nom"],
                                    link: childSnapshot2.val()["url"],
                                    picture: childSnapshot2.val()["image"],
                                    resume: childSnapshot2.val()["description"],
                                    arrayTags: childSnapshot2.val()["tags"],
                                    arrayConfig: null,
                                    configs: listConfig
                                }
                            });
                        }
                    })
                })
            })
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    componentDidMount() {
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        const id_ = params.get('id');
        this.setState({
            id: id_
        });
        this.getMoreInfo(id_);
    }

    render() {
        let listconfig = this.state.myPlugin.configs.map((el, index) => {
            return <SettingView
                id={el.id}
                control={el.control}
                default={el.default}
                min={el.min}
                max={el.max}
                key={index}
            />
        });

        return (
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="">
                        <div className="card shadow p-3 mb-5 rounded">
                            <div className="card-body">
                                <p>{this.state.myPlugin.link}</p>
                                <h5 className="card-title">{this.state.myPlugin.name}</h5>
                                <div className="text-center">
                                    <img src={this.state.myPlugin.picture} width="auto" height="100%" alt=""/>
                                </div>
                                <p>{this.state.myPlugin.resume}</p>
                                <table className="table">
                                    <caption>List of details</caption>
                                    <thead>
                                    <tr>
                                        <th>Control</th>
                                        <th>Default</th>
                                        <th>Min</th>
                                        <th>Max</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {listconfig}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Details;