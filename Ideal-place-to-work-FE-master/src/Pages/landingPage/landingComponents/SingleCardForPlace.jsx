import React, { Component } from "react";
import { Row, Col, Container, CardImg, CardBody, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";
import Star from "../../../icons/Star.png";

const SingleCardForPlace = props => {
  return (
    <Col xs="12" md="6" lg="4" className="places-Col">
      <Link to={"/details/" + props.place._id}>
        <CardImg className="placeImgs"
         src={props.place.Pictures[1]}
        //  src='https://lh3.googleusercontent.com/p/AF1QipNqBg_TubdXrxZibS3qxbi3BicQoSsQjpg8oiuO=s1600-w1080'
          alt="places" />
      </Link>
      <CardBody className="card-taxt-container">
          <Row>
            <Col className='col-8'>{props.place.Name}</Col>
            <Col className='col-4 text-right'>
              {props.place.RateAverage}
              <img
                className="rating-star-icon-landing-page"
                src={Star}
                alt="rating"
              />
            </Col>
          </Row>
      </CardBody>
    </Col>
  );
};
export default SingleCardForPlace;
