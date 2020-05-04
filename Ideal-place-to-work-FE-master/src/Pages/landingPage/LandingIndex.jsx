import React, {Component} from "react";
import "./Landing.css";
import Api from '../../Api';
import Geocode from "react-geocode";
import { geolocated } from "react-geolocated";
import {Container} from "reactstrap";
import LandingSearch from "./landingComponents/LandingSearch";
import LandingAPI from "./landingComponents/LandingAPI";
import {css} from "@emotion/core";
import {GridLoader, HashLoader} from "react-spinners";
import NewFooter from "./landingComponents/NewFooter";


class LandingPage extends Component {
    state = {
        placeToSearch: '',
        toFilter: '',
        pageCount: null,
        limit: 6,
        skip: 0,
        GoodService: false,
        QuitePlace: false,
        WifiRate: false,
        places: [],
        loader: false,
        loading: true,
        nothingFound: false,
        location: {
            latitude: undefined,
            longitude: undefined,
            city: ""
        }
    }

    handlePageClick = data => {
        this.setState({
            loader: true,
            places: []
        })
        let selected = data.selected;
        let offset = Math.ceil(selected * this.state.limit);

        setTimeout(() => {
            this.setState({skip: offset}, async () => {
                if (this.state.GoodService === true || this.state.QuitePlace === true || this.state.WifiRate === true) {
                    await this.filterResults(this.state.toFilter)
                } else if (this.state.placeToSearch) {
                    await this.fetchResults(this.state.placeToSearch)
                } else {
                    const resp = await this.fetchInSpecificPlaces(this.state.location)
                    this.setState({
                        places: resp.places,
                        loader: false
                    })
                }
            })
        }, 1000);
    };

    fetchResults = async (searchPlace) => {
        this.setState({
            GoodService: false,
            QuitePlace: false,
            WifiRate: false,
        })
        const placeToSearch = {
            latitude: this.state.location.latitude,
            longitude: this.state.location.longitude,
            searchQuery: searchPlace,
            placeToSearch: searchPlace
        }
        let places = await Api.fetch(`/placesSearch?limit=${this.state.limit}&skip=${this.state.skip}`, "POST", JSON.stringify(placeToSearch), "");
        console.log(searchPlace, places.places)
        console.log(places.total, this.state.limit, places.total / this.state.limit)
        if (places) {
            this.setState({
                places: places.places,
                pageCount: Math.ceil(places.total / this.state.limit),
            })
        }
    }

    filterResults = async (filter) => {
        const resp = await Api.fetch(`/places?limit=6&sortBy=${filter}&OrderBy=desc&skip=${this.state.skip}`)
        console.log(resp)
        this.setState({
            places: resp.result,
            pageCount: Math.ceil(resp.total / this.state.limit),
        })
    }


    fetchInSpecificPlaces = async (browserCity) => {
        let resp = await Api.fetch(`/placesInSpecificCity?limit=${this.state.limit}&skip=${this.state.skip}`, "POST", JSON.stringify(browserCity), "");
        return resp;
    }

    toggleLoading = () => {
        this.setState({
            loader: !this.state.loader,
        })
    }

    togleFilter = (filterProperty) => {
        this.setState({
            [filterProperty]: !this.state[filterProperty],
            toFilter: filterProperty,
            skip: 0,
        });
        this.filterResults(filterProperty)
    };

    getAddress = async (latitude, longitude) => {
        const resp = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=true&key=${process.env.REACT_APP_GOOGLE_API}`)
        const respJson = await resp.json()
        for(var i = 0; i < respJson.results[0].address_components.length; i++) {
            for(var j = 0; j < respJson.results[0].address_components[i].types.length; j++) {
                if(respJson.results[0].address_components[i].types[j] === "locality"){
                    return respJson.results[0].address_components[i].long_name
                }
            }
        }
    };

    skip = () => {
        this.setState({
            skip: 0
        })
    }


    customCitySearch = async(city) => {
        this.setState({
            loader: true
        })
        Geocode.fromAddress(city).then(
            response => {
                const { lat, lng } = response.results[0].geometry.location;
                this.setState({
                    location: {
                        latitude: lat,
                        longitude: lng,
                        city: city
                    }
                })
            },
            error => {
                console.error(error);
                this.setState({
                    loader: false
                })
            }
        )
        setTimeout(() => {
            this.fetchInSpecificPlaces(this.state.location).then(resp => {
                this.setState({
                    pageCount: Math.ceil(resp.total ? resp.total / this.state.limit : 0 / this.state.limit),
                    places: resp.places ? resp.places : undefined,
                    loader: false
                })
                console.log('yo' + this.state)
            })
        },1000)
    }

    componentDidMount = async() => {
        Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API);
        console.log('ahdsfasdfasdf', this.props)
        setTimeout(async() => {
            if( this.props.isGeolocationAvailable && this.props.isGeolocationEnabled) {
                console.log(this.props.coords.latitude);
                const city = await this.getAddress(this.props.coords.latitude, this.props.coords.longitude)
                const browserCity = {
                    latitude: this.props.coords.latitude,
                    longitude: this.props.coords.longitude,
                    city: city
                }
                let places = await this.fetchInSpecificPlaces(browserCity)
                this.setState({
                    loading: false,
                    loader: false,
                    places: places.places,
                    pageCount: Math.ceil(places.total / this.state.limit),
                    location: {
                        latitude: this.props.coords.latitude,
                        longitude: this.props.coords.longitude,
                        city: city
                    }
                })
            } else {
                const browserCity = {
                    latitude: 52.520008,
                    longitude: 13.404954,
                    city: "Berlin"
                }
                let places = await this.fetchInSpecificPlaces(browserCity)
                this.setState({
                    loading: false,
                    loader: false,
                    places: places.places,
                    pageCount: Math.ceil(places.total / this.state.limit),
                    location: {
                        latitude: 52.520008,
                        longitude: 13.404954,
                        city: "Berlin"
                    }
                })
            }
        }, 3000)
    };

    render() {
        const override = css`
          display: block;
          margin:  auto;
          border-color: red;
`;
        if (this.state.loading) {
            return (
                <div style={{display: 'flex', height: '100vh'}}>
                    {/*<GridLoader*/}
                    {/*    css={override}*/}
                    {/*    size={75}*/}
                    {/*    color={"#b230f1"}*/}
                    {/*    loading={this.state.loading}*/}
                    {/*/>*/}
                    <HashLoader
                        css={override}
                        size={100}
                        color={"#9200E6"}
                        loading={this.state.loading}
                    />
                </div>
            )
        }
        return (
            <>

                <Container fluid style={{padding: '0px', width: '100vw'}}>
                    <div className={'flex-box'}>
                        <div className="flex-row cover-image-bg">
                            <h1 className={'landing-page-title'}>
                                Your next
                                <br/> perfect place <br/>
                                to work.
                            </h1>
                        </div>
                    </div>
                    <LandingSearch
                        skip={this.skip}
                        toggleLoading={this.toggleLoading}
                        fetchResults={this.fetchResults}
                        location={this.state.location}
                    />
                    <LandingAPI
                        customCitySearch={this.customCitySearch}
                        pageCount={this.state.pageCount}
                        city={this.state.location.city}
                        loader={this.state.loader}
                        togleFilter={this.togleFilter}
                        WifiRate={this.state.WifiRate}
                        QuitePlace={this.state.QuitePlace}
                        GoodService={this.state.GoodService}
                        places={this.state.places}
                        handlePageClick={this.handlePageClick}
                    />
                    <NewFooter/>
                </Container>
            </>
        );
    }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(LandingPage);
