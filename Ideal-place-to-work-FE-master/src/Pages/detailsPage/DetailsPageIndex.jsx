import React, {Component} from 'react';
import DetailsPageLanding from "./detailsComponents/DetailsPageLanding";
import "./Details.css";
import UserReview from "../rating& review/reviewComponents/UserReview";
import {css} from "@emotion/core";
import {GridLoader, RiseLoader} from "react-spinners";
import LandingAPI from "../landingPage/landingComponents/LandingAPI";
import NewFooter from "../landingPage/landingComponents/NewFooter";
import {BrowserRouter as Router} from "react-router-dom";


class DetailsPageIndex extends Component {
    state = {};
    handlePageClick = data => {
        this.setState({
            loading: true,
            comment: []
        });
        let selected = data.selected;
        let offset = Math.ceil(selected * this.state.limit);
    };
    toggleFilter = (filterProperty) => {
        this.setState({
            [filterProperty]: !this.state[filterProperty],
            toFilter: filterProperty,
            skip: 0,
        });
        this.filterResults(filterProperty)
    };

    render() {
        return (
            <div>
                <div>
                    <DetailsPageLanding/>
                </div>
                {/*<div>*/}
                {/*    <UserReview*/}
                {/*        pageCount={this.props.pageCount}*/}
                {/*        comment={this.props.comment}*/}
                {/*        loading={this.state.loading}*/}
                {/*        togleFilter={this.toggleFilter}*/}
                {/*        places={this.props.places}*/}
                {/*        handlePageClick={this.handlePageClick}*/}
                {/*    />*/}
                {/*</div>*/}
                <NewFooter/>
            </div>

        );
    }
}

export default DetailsPageIndex;
