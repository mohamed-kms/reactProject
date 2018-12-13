import React, { Component } from 'react';
import firebase from 'firebase';
import SettingPlugin from '../SettingPlugin'

class AddPlugin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id_: '',
            username: '',
            nom: '',
            url: '',
            tag: '',
            image: '',
            inspiredby: '',
            description: '',
            configs: [],
            controlName: '',
            defaultVal: 0,
            minVal: 0,
            maxVal: 0
        };

        this.formulairePostPlugin = this.formulairePostPlugin.bind(this);
    }

    /**
     *
     * @param event
     */
    handleNameCreatorInput(event) {
        console.log("[nom createur]: ", event.target.value);
        const nom_ = event.target.value;
        this.setState({
            nom: nom_
        });
    }
    /**
     *
     * @param event
     */
    handleURLInput(event) {
        console.log("[URL]: ", event.target.value);
        this.setState({
            url: event.target.value
        });
    }
    /**
     *
     * @param event
     */
    handleTagsInput(event) {
        console.log("[TAG]: ", event.target.value);
        this.setState({
            tag: event.target.value
        });
    }
    /**
     *
     * @param event
     */
    handleResumeInput(event) {
        console.log("[Resume]: ", event.target.value);
        this.setState({
            description: event.target.value
        });
    }
    handleImg(event) {
        this.setState({
            image: event.target.files[0]
        });
    }
    /**
     *
     * @param event
     */
    handleControl(event) {
        this.setState({
            controlName: event.target.value
        });
    }
    /**
     *
     * @param event
     */
    handleDefault(event) {
        this.setState({
            defaultVal: event.target.value
        });
    }
    /**
     *
     * @param event
     */
    handleMin(event) {
        this.setState({
            minVal: event.target.value
        });
    }
    /**
     *
     * @param event
     */
    handleMax(event) {
        this.setState({
            maxVal: event.target.value
        });
    }

    /**
     *
     * @param event
     */
    formulairePostPlugin = (event) => {
        event.preventDefault();

        const tagString = this.state.tag;
        const tagList = tagString.split(';');

        const storage = firebase.storage();
        const pictureRef = storage.ref("plugins/"+this.state.image.name);

        var file = this.state.image;

        const database = firebase.database();
        const ref = database.ref("plugins");

        /*pictureRef.getDownloadURL().then((url) => {
            this.state.image = url;
        });*/

        if (this.state.configs.length < 1) {
            return;
        }

        pictureRef.put(file).then((snapshot) => {
            snapshot.ref.getDownloadURL().then((url) => {
                console.log("aaaaaaaaaaaaaaaaa: ", url);
                let form = {
                    username: firebase.auth().currentUser.email.split('@')[0],
                    nom: this.state.nom,
                    tags: tagList,
                    image: url,
                    inspiredby: "",
                    description: this.state.description,
                    configs: this.state.configs,
                    url: this.state.url
                };
                ref.push().set(form, (error) => {
                    if (error) {
                        console.log("BAD");
                    } else {
                        console.log("GOOOD");
                    }
                })
            });
        });


        /*child(this.state.nom)*ref.push().set(form, (error) => {
            if (error) {
                console.log("BAD");
            } else {
                pictureRef.put(file).then((snapshot) => {
                    console.log('Uploaded a blob or file!', pictureRef.getDownloadURL());
                });
                console.log("GOOOD");
            }
        });*/
    };

    addConfig = (event)=> {
        event.preventDefault();

        const conf = {
            control: this.state.controlName,
            default: this.state.defaultVal,
            min: this.state.minVal,
            max: this.state.maxVal
        };

        let newConfig = this.state.configs.concat(conf);
        this.setState({
            configs: newConfig
        })
    };

    deleteConfig(nameConfig) {
        let array = this.state.configs;
        let pos = array.indexOf(nameConfig);
        if (pos === -1) {
            array.splice(pos, 1);
        }
        this.setState({
            configs: array
        })
    }

    render() {

        const user = firebase.auth().currentUser;

        /*firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                user.getIdToken().then((idToken) => {
                    console.log("[handle]: --", idToken);
                }).catch((error) => {
                    console.log("[handle error]: ", error);
                })
            } else {
                console.log("[beuuuu]: ");
            }
        })*/
        let listconfig = this.state.configs.map((el, index) => {
            return <SettingPlugin
                id={el.id}
                control={el.control}
                default={el.default}
                min={el.min}
                max={el.max}
                key={index}
                removeConfig={this.deleteConfig.bind(this, el.control, index)}
            />
        });

        if (user) {
            return (
                <div>
                    <div className="container">
                        <form onSubmit={this.formulairePostPlugin.bind(this)}>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputNameCreator">Nom du createur</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputNameCreator"
                                        placeholder="Nom du createur"
                                        required
                                        value={this.state.nom}
                                        onChange={(event) => this.handleNameCreatorInput(event)}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputURL">Site web</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputURL"
                                        placeholder="Site web"
                                        required
                                        value={this.state.url}
                                        onChange={(event) => this.handleURLInput(event)}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputTags">Liste de TAG</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputTags"
                                    placeholder="Liste de TAG"
                                    required
                                    value={this.state.tag}
                                    onChange={(event) => this.handleTagsInput(event)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="textareaDescription">Description</label>
                                <textarea
                                    className="form-control"
                                    id="textareaDescription"
                                    rows="3"
                                    required
                                    value={this.state.description}
                                    onChange={(event) => this.handleResumeInput(event)}
                                />
                            </div>
                            <div className="form-group">
                                <div className="custom-file">
                                    <input
                                        type="file"
                                        className="custom-file-input"
                                        id="validatedCustomFile"
                                        required
                                        onChange={(event) => this.handleImg(event)}
                                    />
                                    <label className="custom-file-label" htmlFor="validatedCustomFile">Choisir l'image du plugin...</label>
                                    <div className="invalid-feedback">Example invalid custom file feedback</div>
                                </div>
                            </div>
                            <div className="form-group">
                                <table className="table">
                                    <caption>List of details</caption>
                                    <thead>
                                    <tr>
                                        <th>Control</th>
                                        <th>Default</th>
                                        <th>Min</th>
                                        <th>Max</th>
                                        <th/>
                                    </tr>
                                    <tr>
                                        <th>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="inputControl"
                                                placeholder="Liste de TAG"
                                                value={this.state.controlName}
                                                onChange={(event) => this.handleControl(event)}
                                            />
                                        </th>
                                        <th>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="inputDefault"
                                                placeholder="Liste de TAG"
                                                value={this.state.defaultVal}
                                                onChange={(event) => this.handleDefault(event)}
                                            />
                                        </th>
                                        <th>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="inputMin"
                                                placeholder="Liste de TAG"
                                                value={this.state.minVal}
                                                onChange={(event) => this.handleMin(event)}
                                            />
                                        </th>
                                        <th>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="inputMax"
                                                placeholder="Liste de TAG"
                                                value={this.state.maxVal}
                                                onChange={(event) => this.handleMax(event)}
                                            />
                                        </th>
                                        <th>
                                            <button className="btn btn-dark" onClick={this.addConfig}>
                                                <i className="icon ion-md-add"/>
                                            </button>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {listconfig}
                                    </tbody>
                                </table>
                            </div>
                            <button type="submit" className="btn btn-dark">Add plugin</button>
                        </form>
                    </div>
                </div>
            );
        } else {
            return (
                <div>connecté vous !</div>
            )
        }
    }

}

export default AddPlugin;