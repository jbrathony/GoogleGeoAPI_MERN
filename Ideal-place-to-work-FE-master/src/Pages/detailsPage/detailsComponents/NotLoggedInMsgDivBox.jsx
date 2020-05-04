import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import Login from "../../login/LoginModal";
import "../detailsComponents/NotLoggedIn.css";
import close from "../../../icons/close.png"

class NotLoggedInMsgDivBox extends Component {



  render(props) {
    return (
        <div className={ this.props.alertMsgOpen ? "please-login-reg-div" : "please-login-fake-modal"}>
          <div id="please-login-fake-modal">
              <img id="close-icon" 
                  src={close} onClick={this.props.openClose}/>
                  <h2>To Rate Place,</h2> 
                  <h4>Please Login or Signup First!</h4>
          </div>
        </div>
    );
  }

}

export default NotLoggedInMsgDivBox;


