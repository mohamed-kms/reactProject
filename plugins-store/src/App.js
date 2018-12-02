import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import Header from "./components/Header";
import Main from "./components/Main";

// import PluginAudio from './components/PluginAudio';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pluginList: []
        };
    }

    onClickDetail(id) {
        console.log("[DETAILS]");
    }

    render() {
        console.log("[RENDER]");
        // let listPlugin = this.state.pluginList.map((el, index) => {
        //     return <PluginAudio
        //         id={el.id}
        //         name={el.name}
        //         description={el.description}
        //         key={index}
        //         details={this.onClickDetail.bind(this)}
        //     />
        // });

        return (
            <div className="">
                <Header/>
                <Main/>
            </div>
        );
    }
}

export default App;
