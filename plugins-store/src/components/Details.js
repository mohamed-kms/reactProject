import React, { Component } from 'react';
import firebase from "firebase";
import SettingView from './SettingView'

class Details extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            myPlugin: {
                username: null,
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
        db.ref("plugins").once('value').then((snapshot) => {
            snapshot.forEach((snapshot2) => {
                if (snapshot2.key === idPlugin) {
                    console.log("-------->: ", snapshot2.val());
                    let listConfig = [];
                    if (snapshot2.val()["configs"]) {
                        snapshot2.val()["configs"].forEach((elt) => {
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
                            username: snapshot2.val()["username"],
                            name: snapshot2.val()["nom"],
                            link: snapshot2.val()["url"],
                            picture: snapshot2.val()["image"],
                            resume: snapshot2.val()["description"],
                            arrayTags: snapshot2.val()["tags"],
                            arrayConfig: null,
                            configs: listConfig
                        }
                    });
                }
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
                                <p>{this.state.myPlugin.username}</p>
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