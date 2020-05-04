import React, {Component} from 'react';
import Pin from "../../../icons/Pin.png";
import Star from "../../../icons/Star.png";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faDollarSign, faHeart} from "@fortawesome/free-solid-svg-icons"
import closeIcon from "../../../icons/close.png";
import emptyHeart from "../../../icons/emptyHeart.png";
import {Row} from 'reactstrap'
import {Link} from "react-router-dom";
import ReviewModal from "../../rating& review/reviewComponents/ReviewModal";
import UserReview from "../../rating& review/reviewComponents/UserReview";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Api from "../../../Api"
import "../Details.css";
import DetailPageCarousel from "./DetailPageCarousel";
import {faClock} from "@fortawesome/free-regular-svg-icons";
import {css} from "@emotion/core";
import {GridLoader, PacmanLoader, RiseLoader} from "react-spinners";


const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
    // loadProfiles: (user) => dispatch(loadProfile(user))
});

class DetailsPageLanding extends Component {
    state = {
        place: null,
        liked: false,
        rotate180: false,
        loading: false
    };

    calculateWidth = (x) => {
        const width = 250 * x / 100
        return width === 0 ? 5 : width
    }

    ratingFetch = async () => {
        let resp = await Api.fetch(`/places/ratings/${this.props.match.params.id}`)
        console.log(resp)
        this.setState({
            WifiRate: [
                ["#8DD794", this.calculateWidth(resp.WifiRate.RatingPercentages.positive), resp.WifiRate[4] + resp.WifiRate[5], "perfect"],
                ["#FEFC84", this.calculateWidth(resp.WifiRate.RatingPercentages.intermediate), resp.WifiRate[3], "good"],
                ["#FF7284", this.calculateWidth(resp.WifiRate.RatingPercentages.negative), resp.WifiRate[2] + resp.WifiRate[1], "bad"],
            ],
            GoodService: [
                ["#8DD794", this.calculateWidth(resp.GoodService.RatingPercentages.positive), resp.GoodService[4] + resp.GoodService[5], "perfect"],
                ["#FEFC84", this.calculateWidth(resp.GoodService.RatingPercentages.intermediate), resp.GoodService[3], "good"],
                ["#FF7284", this.calculateWidth(resp.GoodService.RatingPercentages.negative), resp.GoodService[2] + resp.GoodService[1], "bad"],
            ],
            QuitePlace: [
                ["#8DD794", this.calculateWidth(resp.QuitePlace.RatingPercentages.positive), resp.QuitePlace[4] + resp.QuitePlace[5], "perfect"],
                ["#FEFC84", this.calculateWidth(resp.QuitePlace.RatingPercentages.intermediate), resp.QuitePlace[3], "good"],
                ["#FF7284", this.calculateWidth(resp.QuitePlace.RatingPercentages.negative), resp.QuitePlace[1] + resp.QuitePlace[2], "bad"],
            ]
        });
        console.log(this.state)
    }
    // toggleRotation = async () => {
    //     if (this.state.rotate180 === false) {
    //         this.setState({
    //             rotate180: true
    //         })
    //     } else if (this.state.rotate180 === true) {
    //         this.setState({
    //             rotate180: false
    //         })
    //     }
    // };

    toggleLike = async () => {
        if (this.state.liked === false) {
            this.setState({
                liked: true
            })
        } else if (this.state.liked === true) {
            this.setState({
                liked: false
            })
        }
        await Api.fetch(`/places/handlefavourites/${this.props.match.params.id}`, "POST", '',
            {"Authorization": "Bearer " + localStorage.getItem("access_token")})
    };

    componentDidMount = async () => {
        window.scroll(0, 0); //For the loader to remain on the top
        this.setState({loading: true});
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            const id = this.props.match.params.id;
            const place = await Api.fetch("/places/" + id); //Fetching the particular place with the id
            this.ratingFetch()
            this.setState({loading: false});
            console.log(place);
            this.setState({ //setting to the state
                place: place
            })
            this.checkPlaceId()
        }
    };

    checkPlaceId = async () => {
        const token = localStorage.getItem("access_token");
        console.log(token);
        const user = await Api.fetch("/users/me", "GET", "", {
        Authorization: "Bearer " + localStorage.getItem("access_token")
    });
        if(user) {
            const place = user.favouritePlaces.find(you => you._id === this.props.match.params.id)
            console.log(user, place)
            if(place) {
                this.setState({
                    liked: true
                })
            }
        }

    }

    render() {
        const override = css`
          display: block;
          margin:  auto;
          border-color: red;
`;
        if (this.state.loading) {
            return (
                <div style={{display: 'flex', height: '100vh'}}>
                    {/*<RiseLoader*/}
                    {/*    css={override}*/}
                    {/*    size={25}*/}
                    {/*    color={"#b230f1"}*/}
                    {/*    loading={this.state.loading}*/}
                    {/*/>*/}
                    <PacmanLoader
                        css={override}
                        size={25}
                        color={"#b230f1"}
                        loading={this.state.loading}
                    />

                </div>
            )
        }
        return (

            <>
                {this.state.place && <>
                    <div className={'flex-box cover-image-details'}>
                        <DetailPageCarousel place={this.state.place}/>
                        <Link to="/"><img className="location-close-icon" src={closeIcon} alt="Close"/></Link>
                    </div>
                    <div className="container details">
                        <div className="coffee-point flex-box">
                            <div className="row-details">
                                <h2 className="place-title">{this.state.place.Name}</h2>
                            </div>
                            <div className="spacer"/>

                            <div className="click-to-like" style={{fontSize: "40px"}}>

                            {/* className={this.state.rotate180 ? "dislike-btn" : "like-btn"} */}

                            {!this.state.liked ? <img className="like-btn" src={emptyHeart} onClick={() => {
                                    this.toggleLike();
                                }}/> :
                                <FontAwesomeIcon
                                    icon={faHeart}
                                    onClick={() => {
                                        this.toggleLike();
                                    }}/>}
                            </div>
                        </div>
                        <div className="flex-box">
                            <div><img className="location-pin-icon" src={Pin} alt="Home"/></div>
                            <div className="location-text"><h4>{this.state.place.Location}</h4></div>
                        </div>
                        <div>
                            <div className="row-details-rate-place">
                                <div className="rating-container">
                                    <img className="rating-star-icon" src={Star} alt="rating"/>
                                </div>
                                <div>
                                    <div>
                                        <ReviewModal placeId={this.props.match.params.id}/>
                                    </div>
                                </div>
                            </div>
                            <div className="row-details">

                                <div className="opening-hours"><h4 className="open-hours-text">Open
                                    Hours</h4>{this.state.place.OpenHours.map(hour => <div>
                                    <FontAwesomeIcon icon={faClock}/> {hour}</div>)}</div>
                                <div className="flex-box web-site">
                                    <div>
                                        <div><h4 className="website-title">Website:</h4></div>
                                        <div className="web-site-link"><p>{this.state.place.Website}</p></div>
                                        <div>
                                            {this.state.place.PriceToEnter !== -1 && <div className="flex-box">
                                                <div>
                                                    <h4>Price to enter:</h4>
                                                    <div className="flex-box">
                                                        <div><FontAwesomeIcon icon={faDollarSign}/></div>
                                                        <div
                                                            className="price-to-enter">{this.state.place.PriceToEnter}</div>
                                                    </div>
                                                </div>
                                            </div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="div-graphs">
                                <Row>
                                    <div className='col-4'>
                                        <h2 className="graph-header">Good WiFi:</h2>
                                        {this.state.WifiRate && this.state.WifiRate.map((g, i) => (<>
                                                <div key={i} style={{
                                                    backgroundColor: `${g[0]}`,
                                                    height: "25px",
                                                    borderRadius: "10px",
                                                    width: `${g[1]}px`
                                                }}></div>
                                                <p className="graph-paragraph">{g[2]} people rated this field
                                                    as {g[3]} </p>
                                            </>
                                        ))}
                                    </div>
                                    <div className='col-4'>
                                        <h2 className="graph-header">Quiet Place:</h2>
                                        {this.state.QuitePlace && this.state.QuitePlace.map((q, i) => (<>
                                                <div key={i} style={{
                                                    backgroundColor: `${q[0]}`,
                                                    height: "25px",
                                                    borderRadius: "10px",
                                                    width: `${q[1]}px`
                                                }}></div>
                                                <p className="graph-paragraph">{q[2]} people rated this field
                                                    as {q[3]} </p>
                                            </>
                                        ))}
                                    </div>
                                    <div className='col-4'>
                                        <h2 className="graph-header">Good Service:</h2>
                                        {this.state.GoodService && this.state.GoodService.map((g, i) => (<>
                                                <div key={i} style={{
                                                    backgroundColor: `${g[0]}`,
                                                    height: "25px",
                                                    borderRadius: "10px",
                                                    width: `${g[1]}px`
                                                }}></div>
                                                <p className="graph-paragraph">{g[2]} people rated this field
                                                    as {g[3]} </p>
                                            </>
                                        ))}
                                    </div>
                                </Row>
                            </div>
                            <div>
                            </div>
                        </div>
                        <div className="user-review">
                            <UserReview placeId={this.props.match.params.id}/>
                        </div>
                    </div>
                </>}
            </>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DetailsPageLanding));
