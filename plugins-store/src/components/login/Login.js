import React, {Component} from 'react';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            account: {
                username: '',
                password: ''
            }
        };
        this.loginAccount = this.loginAccount.bind(this);
    }


    loginAccount() {
        console.log("CREATE ACCOUNT...");
        if (!this.state.account.username || !this.state.account.password) {
            console.log("[WARNING] Champs required");
            return;
        }
        let form = {
            username: this.state.account.username,
            password: this.state.account.password
        };
        console.log("Account " + JSON.stringify(form) + " Created");
        debugger;
    }

    updateFormName(event) {
        const username = event.target.value;
        this.setState(prevState => ({
            account: {
                ...prevState.account,
                username
            }
        }))
    }

    updateFormPassword(event) {
        const password = event.target.value;
        this.setState(prevState => ({
            account: {
                ...prevState.account,
                password
            }
        }))
    }

    render() {
        return (
            <div className="row align-self-center">
                <div className="col d-none d-sm-none d-md-none"/>
                <div className="col justify-content-center">
                    <form onSubmit={this.loginAccount}>
                        <div className="form-group">
                            <label htmlFor="ieInputUsername">Username</label>
                            <input type="text" className="form-control" id="ieInputUsername"
                                   value={this.state.account.username}
                                   onChange={this.updateFormName.bind(this)} required
                                   placeholder="Entrer un username"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="ieInputPassword">Password</label>
                            <input type="password" className="form-control" id="ieInputPassword"
                                   value={this.state.account.password}
                                   onChange={this.updateFormPassword.bind(this)} required
                                   placeholder="Password"/>
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
                <div className="col d-none d-sm-none d-md-none"/>
            </div>
        );
    }
}
export default Login;