import React, { } from 'react';
import logo from "../logo.svg";

function PluginAudio(props) {
    return (
        <div className="card">
            <div className="card-body border border-secondary bg-light rounded">
                <h5>{props.name}</h5>
                <img src={logo} width="70" height="70" alt=""/>
                <p>{props.description}</p>
                <button className="btn btn-primary" onClick={() => props.showDetailPlugin(props.id)}>Details</button>
            </div>
        </div>
    );
}

export default PluginAudio;