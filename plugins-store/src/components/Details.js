import React, { Component } from 'react';
import HomeStore from "./home/HomeStore";
import PluginAudio from "./PluginAudio";
import firebase from "firebase";

class Details extends Component {

    constructor(props) {
        super(props);
    }

    getDetail(idPlugin) {
        console.log("--- GETTING DATA ---");
        var db = firebase.firestore();
        db.settings({
            timestampsInSnapshots: true
        });
        var collection = db.collection("plugins");
        var query = collection.where("id", "==", idPlugin);
        console.log("wwwwwwww>"+query);
        /*db.collection("plugins").get().then((querySnapshot) => {
            let newPlugins = [];
            querySnapshot.forEach((doc) => {
                console.log("=====+>"+doc.id+" "+JSON.stringify(doc.data()));
                console.log("=====+>"+doc.id+" ++++ "+doc.data().creator);
                for (var n in doc.data()) {
                    console.log("*******>"+n+" ");
                }
                newPlugins.push({
                    "id" : doc.id,
                    "name" : doc.data().creator,
                    "description" : doc.data().description,
                    "img" : doc.data().url,
                });
            });
            this.setState({
                pluginList: newPlugins
            });
            console.log("=====+>"+querySnapshot.docs.length+" ");
        })*/
    }

    componentDidMount() {
        console.log("[TTTT]"+this.props);
        //debugger;
        //this.getDetail();
    }

    render() {
/*        let showPlugin = this.state.pluginList.map((el, index) => {
            return <PluginAudio
                id={el.id}
                name={el.name}
                description={el.description}
                key={index}
            />
        });
*/
        return (
            <div>
                <p>Details {/*this.props.match.params*/}</p>
                <p>Details</p><p>Details</p><p>Details</p><p>Details</p><p>Details</p><p>Details</p><p>Details</p>
            </div>
        );
    }

}

export default Details;