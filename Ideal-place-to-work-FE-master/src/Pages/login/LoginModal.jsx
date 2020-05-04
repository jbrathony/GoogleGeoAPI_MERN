import React from "react";
import { Col } from "reactstrap"
import ReactModalLogin from "react-modal-login";
import {facebookConfig, googleConfig} from "../login/social-config";
import SweetAlert from 'sweetalert2-react';
import Api from "../../Api"
import {connect} from "react-redux";
import User from "../../icons/User.png";
import ReactTooltip from "react-tooltip";
import "./Login.css"

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
    setUserToken: base64 => dispatch({
        type: "SET_USERBASE64",
        payload: base64
    })
});


class LoginModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            loggedIn: null,
            loading: false,
            error: null,
            initialTab: null,
            errorText: "",
            recoverPasswordSuccess: null,
            greetings: false,
            username: undefined,
            hour: undefined,
        };

    }

    onLogin() {
        console.log('__onLogin__');
        console.log('username: ' + document.querySelector('#username').value);
        console.log('password: ' + document.querySelector('#password').value);

        const username = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;

        if (!username || !password) {
            this.setState({
                error: true
            })
        } else {
            const base64usernameAndPassword = btoa(username + ":" + password);
            Api.fetch("/auth/login", 'POST', "", {
                "Authorization": "Basic " + base64usernameAndPassword
            })
                .then(res => {
                    console.log(res);
                    if (res.accessToken) {
                        this.onLoginSuccess('form');
                        localStorage.setItem("access_token", res.accessToken);
                        this.props.setUserToken(base64usernameAndPassword);
                        this.props.fetchUser()
                        this.setState({
                            username: res.user.firstname + " " + res.user.lastname,
                            greetings: true
                        })
                        // TODO: redirect to home
                    }
                }).catch((error) => {
                this.setState({
                    error: true
                })
            })
        }
    }

    onRegister() {
        console.log('__onRegister__');

        console.log('username: ' + document.querySelector('#username').value);
        console.log('password: ' + document.querySelector('#password').value);

        const firstname = document.querySelector('#name').value;
        const lastname = document.querySelector('#surname').value;
        const email = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;
        const picture = document.querySelector('#imageUrl').value;
        if (!firstname || !lastname || !email || !password || !picture) {
            this.setState({
                error: true
            })
        } else {
            const base64usernameAndPassword = btoa(email + ":" + password);
            Api.fetch("/auth/register", 'POST', JSON.stringify({
                firstname, lastname, picture , username: email,
                password
            }))

                .then(res => {
                    console.log(res);
                    if (res.user) {
                        this.onLoginSuccess('form');
                        localStorage.setItem("userBase64", base64usernameAndPassword);
                        this.props.setUserToken(base64usernameAndPassword);
                        this.props.fetchUser()
                    }
                }).catch((err) => {
                console.log(err);
                this.setState({
                    error: true,
                    errorText: err.response.msg ? err.response.msg : null
                })
            })
        }
    }


    onRecoverPassword() {
        console.log('__onFotgottenPassword__');
        console.log('email: ' + document.querySelector('#username').value);

        const email = document.querySelector('username').value;


        if (!email) {
            this.setState({
                error: true,
                recoverPasswordSuccess: false
            })
        } else {
            this.setState({
                error: null,
                recoverPasswordSuccess: true
            });
        }
    }

    openModal(initialTab) {
        this.setState({
            initialTab: initialTab
        }, () => {
            this.setState({
                showModal: true,
            })
        });
    }

    onLoginSuccess(method, response) {
        console.log(method, response);
        if (method === "facebook") {
            window.FB.api("/me", {fields: 'last_name,first_name,email,picture'}, (res) => {
                console.log(res);
                Api.fetch("/auth/facebook", "POST", {auth: response.authResponse, profile: res})
                    .then(userdata => {
                        console.log(res);
                        localStorage.setItem("access_token", userdata.accessToken);
                        this.props.fetchUser();
                        this.setState({
                            username: userdata.user.firstname + " " + userdata.user.lastname,
                            greetings: true
                        })
                    })
            });
        }
        if (method === "google") {
            window.FB.api("/me", {fields: 'ID,Name,Image URL,Email'}, (res) => {
                console.log(res);
                Api.fetch("/auth/google", "POST", {auth: response.authResponse, profile: res})
                    .then(userdata => {
                        console.log(res);
                        localStorage.setItem("access_token", userdata.accessToken);
                        this.props.fetchUser();
                        this.setState({
                            username: userdata.user.firstname + " " + userdata.user.lastname,
                            greetings: true
                        })
                    })
            });
        }
        this.closeModal();
        this.setState({
            loggedIn: method,
            loading: false
        })
    }

    onLoginFail(method, response) {

        this.setState({
            loading: false,
            error: response
        })
    }

    startLoading() {
        this.setState({
            loading: true
        })
    }

    finishLoading() {
        this.setState({
            loading: false
        })
    }

    afterTabsChange() {
        this.setState({
            error: null,
            recoverPasswordSuccess: false,
        });
    }

    closeModal() {
        this.setState({
            showModal: false,
            error: null
        });
    }

    componentDidMount = () => {
        const date = new Date();
        const hour = date.getHours()
        this.setState({
            hour: hour
        })
    }

    render() {

        const isLoading = this.state.loading;

        return (
            <div>
                <ReactTooltip/>
                <Col data-tip={this.state.loggedIn ? "You are signed in" : "You are signed out"}
                     onClick={() => this.openModal('login')}> <span className="footer-options">LOGIN</span> </Col>

                <SweetAlert
                    show={this.state.greetings}
                    title={this.state.hour < 12 ? `Good Morning ${this.state.username}` : `Good evening ${this.state.username}`}
                    text="Welcome to Ideal Place To Work"
                    onConfirm={() => this.setState({ greetings: false })}
                />

                <ReactModalLogin
                    visible={this.state.showModal}
                    onCloseModal={this.closeModal.bind(this)}
                    loading={isLoading}
                    initialTab={this.state.initialTab}
                    error={this.state.error}
                    tabs={{
                        afterChange: this.afterTabsChange.bind(this)
                    }}
                    startLoading={this.startLoading.bind(this)}
                    finishLoading={this.finishLoading.bind(this)}
                    registerError={{label: this.state.errorText}}
                    form={{
                        onLogin: this.onLogin.bind(this),
                        onRegister: this.onRegister.bind(this),
                        onRecoverPassword: this.onRecoverPassword.bind(this),

                        recoverPasswordSuccessLabel: this.state.recoverPasswordSuccess
                            ? {
                                label: "New password has been sent to your mailbox!"
                            }
                            : null,
                        recoverPasswordAnchor: {
                            label: "Forgot your password?"
                        },
                        loginBtn: {
                            label: "Sign in"
                        },
                        registerBtn: {
                            label: "Sign up"
                        },
                        recoverPasswordBtn: {
                            label: "Send new password"
                        },
                        loginInputs: [
                            {
                                containerClass: 'RML-form-group',
                                label: 'Username',
                                type: 'text',
                                inputClass: 'RML-form-control',
                                id: 'username',
                                name: 'username',
                                placeholder: 'Username',
                            },
                            {
                                containerClass: 'RML-form-group',
                                label: 'Password',
                                type: 'password',
                                inputClass: 'RML-form-control',
                                id: 'password',
                                name: 'password',
                                placeholder: 'Password',
                            }
                        ],
                        registerInputs: [
                            {
                                containerClass: 'RML-form-group',
                                label: 'Name',
                                type: 'text',
                                inputClass: 'RML-form-control',
                                id: 'name',
                                name: 'name',
                                placeholder: 'Name',
                            },
                            {
                                containerClass: 'RML-form-group',
                                label: 'Surname',
                                type: 'text',
                                inputClass: 'RML-form-control',
                                id: 'surname',
                                name: 'surname',
                                placeholder: 'Surname',
                            },
                            {
                                containerClass: 'RML-form-group',
                                label: 'Picture',
                                type: 'text',
                                inputClass: 'RML-form-control',
                                id: 'imageUrl',
                                name: 'imageUrl',
                                placeholder: 'https://',
                            },
                            {
                                containerClass: 'RML-form-group',
                                label: 'Email',
                                type: 'email',
                                inputClass: 'RML-form-control',
                                id: 'username',
                                name: 'username',
                                placeholder: 'Username',
                            },
                            {
                                containerClass: 'RML-form-group',
                                label: 'Password',
                                type: 'password',
                                inputClass: 'RML-form-control',
                                id: 'password',
                                name: 'password',
                                placeholder: 'Password',
                            }
                        ],
                        recoverPasswordInputs: [
                            {
                                containerClass: 'RML-form-group',
                                label: 'Email',
                                type: 'email',
                                inputClass: 'RML-form-control',
                                id: 'email',
                                name: 'email',
                                placeholder: 'Email',
                            },
                        ],
                    }}
                    separator={{
                        label: "or"
                    }}
                    providers={{
                        facebook: {
                            config: facebookConfig,
                            onLoginSuccess: this.onLoginSuccess.bind(this),
                            onLoginFail: this.onLoginFail.bind(this),
                            inactive: isLoading,
                            label: "Continue with Facebook"
                        },
                        google: {
                            config: googleConfig,
                            onLoginSuccess: this.onLoginSuccess.bind(this),
                            onLoginFail: this.onLoginFail.bind(this),
                            inactive: isLoading,
                            label: "Continue with Google"
                        }
                    }}
                />
                {/*{loggedIn}*/}
            </div>

        )
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(LoginModal));

