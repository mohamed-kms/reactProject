import React, { Component } from 'react';
import HomeStore from "../home/HomeStore";

class AddPlugin extends Component {

    render() {
        return (
            <div>
                PAGE AJOUT
                <button type="button" className="btn btn-dark mb-3"><i className="icon ion-md-add"></i></button>
                -----
                <button type="button" className="btn btn-dark mb-3"><i className="icon ion-md-log-out"></i></button>

                <div className="row">
                    <div className="col">
                        <p>SEARCH</p>
                        <p>TABLE</p>
                    </div>
                    <div className="col">UPDATE</div>
                    <div className="col">INSERTION</div>
                </div>
            </div>
        );
    }

}

export default AddPlugin;