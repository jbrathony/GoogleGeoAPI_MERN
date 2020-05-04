import React, {Component} from 'react';
import Api from "../../../Api";
import {Redirect, withRouter} from "react-router";

class CallBack extends Component {
    state = {redirect: false};

    componentDidMount = async () => {
        let resp = await Api.fetch(`/auth/emailverification/${this.props.match.params.emailToken}`);
        console.log(this.props);
        console.log(document.location);
//If the user is having the token the response will be success
        if (resp.accessToken) {
            this.setState({redirect: true});
        } else {
            alert("bad verification") //inform user that something went wrong
        }
    };

    render() {
        if (this.state.redirect) {
            return (<Redirect to="/"/>) //redirecting to the landing page
        }
        return (
            <div>Please wait...</div>
        );
    }
}

export default withRouter(CallBack);
