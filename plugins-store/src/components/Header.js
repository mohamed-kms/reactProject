import React, { } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
// import logo from './logo.svg';

function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: '#000000'}}>
            {/*<a className="navbar-brand">
                * <img src={logo} width="30" height="30" className="d-inline-block align-top" alt=""/> *
                PluginStore
            </a>*/}
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav"
                    aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className = "nav-link" to = '/'>Plugins</Link>
                    </li>
                    <li className="nav-item">
                        <Link className = "nav-link" to = '/add'>Add</Link>
                    </li>
                    <li className="nav-item">
                        <Link className = "nav-link" to = '/' onClick={() => {
                            firebase.auth().signOut().then(() => {
                                console.log("[Logged out!]");
                            }, (error) => {
                                console.log("[error]: ", error);
                            })
                        }}>Logout</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Header;