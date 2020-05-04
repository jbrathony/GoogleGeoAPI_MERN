import React, { Component } from "react";
import { Row, Col, Container, Input, Button } from "reactstrap";
import SingleCardForPlace from './SingleCardForPlace';
import Loader from 'react-loader-spinner';
import ReactPaginate from 'react-paginate';
import cupIcon from "../../../icons/bars01.png";
import workIcon from "../../../icons/cowos01.png";
import wifiIcon from "../../../icons/wifi01.png";
import cupIcon2 from "../../../icons/bars02.png";
import workIcon2 from "../../../icons/cowos02.png";
import wifiIcon2 from "../../../icons/wifi02.png";
import "../Landing.css";


class LandingAPI extends Component {
  state = {
    filterBox: false,
    city: undefined
  };

  filterBlockOpen = () => {
    this.setState({
      filterBox: !this.state.filterBox
    });
  };



  render() {
    return (
      <>
        <Container fluid style={{ padding: "0px 40px", minHeight:'100vh' }}>
        <Row className='near-your-filter-div'>
            <Col xs="6">
              <h3 className="near-you-filter-landing-page">In Your City <span style={{color: "#9200E6"}}>{this.props.city}</span></h3>
            </Col>
            <Col xs="6">
              <div
                className={
                  this.state.filterBox
                    ? "div-with-filtering-options-toggled"
                    : "div-with-filtering-options"
                }
              >
                <h3
                  className="near-you-filter-landing-page"
                  id="filterBy"
                  onClick={this.filterBlockOpen}
                >
                  Filter By
                </h3>
                <Row>
                  <Col className="col-4">
                    <img
                      className="filterIcons"
                      src={this.props.GoodService ? cupIcon2 : cupIcon}
                      id="GoodService"
                      onClick={(e) => this.props.togleFilter(e.target.id)}
                      alt="service-icon"
                    />
                    <div className='description-for-filters'>
                      <h4>Good Service</h4>
                    </div>
                  </Col>
                  <Col className="col-4">
                    <img
                      className="filterIcons"
                      src={this.props.QuitePlace ? workIcon2 : workIcon}
                      id="QuitePlace"
                      onClick={(e) => this.props.togleFilter(e.target.id)}
                      alt="working-icon"
                    />
                    <div className='description-for-filters'>
                      <h4>Quiet Place</h4>
                    </div>
                  </Col>

                  <Col className="col-4">
                    <img
                      className="filterIcons"
                      src={this.props.WifiRate ? wifiIcon2 : wifiIcon}
                      id="WifiRate"
                      onClick={(e) => this.props.togleFilter(e.target.id)}
                      alt="wifi-icon"
                    />
                    <div className='description-for-filters'>
                      <h4>Strong <br/> WiFi</h4>
                    </div>
                  </Col>
                </Row>
                  <hr/>
                  <div className='filter-descrp-bottom'>
                      <h3>Choose by filters. <strong>Unselect them for ALL results.</strong></h3>
                  </div>
              </div>
            </Col>
        </Row>
            <div className="div-select-city">
                <h3 className="select-city-landing-page">Or Select City</h3>
                <Input className='landing-input' onChange={(e) => this.setState({city: e.target.value})} type="text"/>
                <Button onClick={() => this.props.customCitySearch(this.state.city)}>Search</Button>
            </div>
            <div>
                <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={this.props.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.props.handlePageClick}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                />
            </div>
            <Row>
                {this.props.places ? this.props.places.map((place, index) => (
                    <SingleCardForPlace place={place} key={index}/>
                )) : <h1>Nothing was found</h1>}
            </Row>
          {this.props.loader && <div><Loader
                type="Oval"
                color="#9200E6"
                height={70}
                width={70}
                style={{padding: '100px 44%'}}
             /></div>}
        </Container>
      </>
    );
  }
}
export default LandingAPI;
