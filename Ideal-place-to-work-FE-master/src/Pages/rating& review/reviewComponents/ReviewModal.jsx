import React from 'react';
import { Col, Row, Button } from 'reactstrap';
import StarRatings from 'react-star-ratings';
import { withRouter } from "react-router";
import Api from '../../../Api';
import Coffee from "../../../icons/bars01.png";
import ComfyPlace from "../../../icons/cowos01.png";
import closeIcon from "../../../icons/close.png";
import WiFi from "../../../icons/wifi01.png";
import "../Rating.css"
import NotLoggedIn from "../../detailsPage/detailsComponents/NotLoggedInMsgDivBox"
import "../../detailsPage/detailsComponents/NotLoggedIn.css"


class CommentModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            alertMsgDiv: false,
            showAlertMsg: false,
            selectedFile: null,
            comment: {
                  Text: "",
                  Rating: 0,
                  GoodService: 0,
                  WifiRate: 0,
                  QuitePlace: 0,
            },
        };
    }

    handleText = (e) => {
        console.log(e.target.value)
        const text = e.target.value
        this.setState(prevState => ({
            comment: {                   // object that we want to update
                ...prevState.comment,    // keep all other key-value pairs
                Text: text      // update the value of specific key
            }
        }))
    }

    changeRating = ( newRating, name ) => {
        this.setState(prevState => ({
            comment: {                   // object that we want to update
                ...prevState.comment,    // keep all other key-value pairs
                [name]: newRating       // update the value of specific key
            }
        }))
    }

    submitComment = () => {
        Api.fetch(`/reviews/${this.props.match.params.id}`, "POST", JSON.stringify(this.state.comment), {"Authorization": "Bearer " + localStorage.getItem("access_token")})
        this.setState({
            modal: false
        })
    }

    toggleModalOrAlert = () => {
        const token = localStorage.getItem("access_token")
        if (token !== "undefined" && token !== "" && token) {
            console.log("token")
            console.log(this.state.modal)
            this.setState({ modal: !this.state.modal })
            console.log(this.state.modal)
        } else {
            console.log("no token")
            this.setState({ alertMsgDiv: !this.state.alertMsgDiv })
            console.log(this.state.alertMsgDiv)
        }
    };

    toggleShowAlertMsg = (e) => {
        this.setState({ alertMsgOpen: !this.state.alertMsgOpen })
        console.log(this.state.alertMsgOpen)
    };

    render() {
        return (<>
            <div id="please-login-reg-div" className="cursor" onClick={this.toggleModalOrAlert} >
                <h2 className={this.state.alertMsgDiv ? 'rate-place-alert' : 'rate-place'}>Rate Place</h2>
            </div>

            {this.state.alertMsgDiv && <NotLoggedIn alertMsgOpen={this.alertMsgOpen} openClose={this.toggleModalOrAlert}/>}
            {this.state.modal && <div className={this.state.modal ? "review-modal-open" : "review-modal-close"}>
            <div>
                <h2 className="modal-rev-header">
                    How would you <br />
              Rate this place?
            </h2>
                <img
                    src={closeIcon}
                    onClick={this.toggleModalOrAlert}
                    className="exit-icon-modal"
                    alt="searchIcon"
                />
            </div>
                <Row>
                    <Col className="col-12">
                        <Row className='mt-4'>
                            <Col className="col-3 mt-3">
                                <img
                                    src={WiFi}
                                    className="rating-icon-modal"
                                    alt="searchIcon"
                                />
                            </Col>
                            <Col className="col-9 mt-3">
                                <Row>
                                    <Col className="col-12">
                                        <h3>Was the wifi good enough?</h3>
                                    </Col>
                                    <Col className="col-12">
                                        <StarRatings
                                        rating={this.state.comment.WifiRate}
                                        starRatedColor="#8806C1"
                                        changeRating={this.changeRating}
                                        numberOfStars={5}
                                        isSelectable={true}
                                        name='WifiRate'
                                        starDimension="30px"
                                        starSelectingHoverColor="#8806C1"
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col className="col-3 mt-3">
                                <img
                                    src={Coffee}
                                    className="rating-icon-modal"
                                    alt="searchIcon"
                                />
                            </Col>
                            <Col className="col-9 mt-3">
                                <Row>
                                    <Col className="col-12">
                                        <h3>Was the service good enough?</h3>
                                    </Col>
                                    <Col className="col-12">
                                        <StarRatings
                                        rating={this.state.comment.GoodService}
                                        starRatedColor="#8806C1"
                                        changeRating={this.changeRating}
                                        numberOfStars={5}
                                        isSelectable={true}
                                        name='GoodService'
                                        starDimension="30px"
                                        starSelectingHoverColor="#8806C1"
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col className="col-3 mt-3">
                                <img
                                    src={ComfyPlace}
                                    className="rating-icon-modal"
                                    alt="searchIcon"
                                />
                            </Col>
                            <Col className="col-9 mt-3">
                                <Row>
                                    <Col className="col-12">
                                        <h3>Was the place quiet enough?</h3>
                                    </Col>
                                    <Col className="col-12">
                                        <StarRatings
                                        rating={this.state.comment.QuitePlace}
                                        starRatedColor="#8806C1"
                                        changeRating={this.changeRating}
                                        numberOfStars={5}
                                        isSelectable={true}
                                        name='QuitePlace'
                                        starDimension="30px"
                                        starSelectingHoverColor="#8806C1"
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col className="col-4 mt-3 ml-4">
                                <h3>General impression?</h3>
                            </Col>
                            <Col className="col-9 mt-3 ml-4">
                                <StarRatings
                                    rating={this.state.comment.Rating}
                                    starRatedColor="#8806C1"
                                    changeRating={this.changeRating}
                                    numberOfStars={5}
                                    isSelectable={true}
                                    name='Rating'
                                    starDimension="30px"
                                    starSelectingHoverColor="#8806C1"
                                    />
                            </Col>
                            <Col className='col-12 mt-3 ml-4'>
                                <form className="form-container">
                                    <label>Leave a comment</label>
                                    <br/>
                                    <textarea onChange={this.handleText}
                                    cols="10" rows="50"></textarea>
                                </form>
                            </Col>
                        </Row>
                    </Col>
                    <Button onClick={this.submitComment} className='ml-5 mt-2 '>Submit</Button>
                </Row>
            </div>}
        </>
        );
}
}

export default withRouter(CommentModal);
