import React, { } from 'react';
import { Route } from 'react-router-dom';

function PluginAudio2(props) {
    return (
        <div className="card text-center shadow p-3 mb-5 rounded" style={{ backgroundColor: '#FFFFFF' }}>
            <div className="card-body">
                <h3 className="font-weight-bold">{props.name}</h3>
                <img src={props.img} className="img-fluid" alt=""/>
                <p className="">Inspired By {props.description}</p>
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

export default PluginAudio2;