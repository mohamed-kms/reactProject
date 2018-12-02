import React, { } from 'react';
import logo from "../logo.svg";

function showPlugin(props) {
    return (
        <div>
            <h5>{props.name}</h5>
            <img src={logo} width="70" height="70" alt=""/>
            <p>{props.description}</p>
            <button className="btn btn-primary">Details</button>
        </div>
    );
}

export default showPlugin;