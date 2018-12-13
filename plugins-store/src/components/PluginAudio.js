import React, { } from 'react';
import { Route } from 'react-router-dom';
import logo from "../logo.svg";

function PluginAudio(props) {
    return (
        <div className="card text-center shadow p-3 mb-5 rounded" style={{ backgroundColor: '#444444' }}>
            <div className="card-body">
                <h3 className="font-weight-bold text-white">{props.name}</h3>
                <img src={props.img} width="75%" height="150%" alt=""/>
                <p className="text-white">Inspired By {props.description}</p>
                <Route
                    render={({ history }) => (
                        <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={() => { history.push("/detail?id="+props.id.key) }/*props.showDetailPlugin(props.id)*/}
                        >Details</button>
                    )}
                />
            </div>
        </div>
    );
}

export default PluginAudio;