import React, { Component, useReducer } from "react";
import { Link } from 'react-router-dom'
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
  Col,
  Row,
  Container
} from "reactstrap";
import Api from "../../Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "../favoritesPage/Favorites.css";
import NewFooter from "../landingPage/landingComponents/NewFooter";

class FavoritesPageIndex extends Component {
  state = {
    favedPlaces: [],
    liked: true
  };

  componentDidMount = async () => {
    this.fetchFavPlaces();
  };

  fetchFavPlaces = async () => {
    const token = localStorage.getItem("access_token");
    console.log(token);
    const user = await Api.fetch("/users/me", "GET", "", {
      Authorization: "Bearer " + localStorage.getItem("access_token")
    });
    console.log(user);
    this.setState({ favedPlaces: user.favouritePlaces });
  };

  toggleLike = async id => {
    if (this.state.liked === true) {
      this.setState({
        liked: false
      });
    } else if (this.state.liked === false) {
      this.setState({
        liked: true
      });
    }
    await Api.fetch(`/places/handlefavourites/${id}`, "POST", "", {
      Authorization: "Bearer " + localStorage.getItem("access_token")
    });
    this.fetchFavPlaces();
  };

  render() {
    return (
      <div className="favs-container" d-flex>
          <Col className="headings-txt">
                <h2>Saved</h2>
                <h4>Here you can find all of your Favorites</h4>
          </Col>
        <Row>
          {this.state.favedPlaces.length >= 1 &&
            this.state.favedPlaces.map((favedPlaces, i) => (
              <Col xs="12" md="6" lg="4">
                <Card className="divCard" style={{ marginBottom: "20px" }}>
                  <Link to={"/details/" + favedPlaces._id}><CardImg
                    id="cardImg"
                    src={favedPlaces.Pictures[0]}
                    alt="Card image cap"/></Link>
                  <Container id="CardBod">
                  <CardBody className="card-body">
                    <CardTitle key={i}>{favedPlaces.Name}</CardTitle>
                    <CardText>
                      {/* <div>{favedPlaces.Location}</div> */}
                      <div id="like-disklike-btn">
                        <FontAwesomeIcon
                          icon={faHeart}
                          onClick={() => this.toggleLike(favedPlaces._id)}/>
                      </div>
                    </CardText>
                      <CardText>
                          {/* <small className="addedAt">{this.props.user.createdAt()}</small> */}
                      </CardText>
                  </CardBody>
                  </Container>
                </Card>
              </Col>
            ))}
        </Row>
          <NewFooter/>
      </div>

    );
  }

}

export default FavoritesPageIndex;
