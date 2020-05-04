import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import LandingPage from "./Pages/landingPage/LandingIndex";
import CallBack from "./Pages/landingPage/landingComponents/CallBack";
import Api from './Api'
//import NewFooter from "./Pages/landingPage/landingComponents/NewFooter";
import Map from './Pages/landingPage/Map';
import DetailsPageLanding from './Pages/detailsPage/DetailsPageIndex';
import FavoritesPageIndex from './Pages/favoritesPage/FavoritesPageIndex';


class Main extends Component {
    componentDidMount = async () => {
        const resp = await Api.fetch('/auth/refresh', "POST", "", {"Authorization": "Bearer " + localStorage.getItem('token')})
        console.log(resp)
        localStorage.setItem('access_token', resp.accessToken)
    }

    render() {
        return (
            <>
                <Router>
                    <div className="main-container">
                        <Switch>
                            <Route exact path="/"><LandingPage/></Route>
                            <Route exact path="/callback/:emailToken"><CallBack/></Route>
                            <Route path="/details/:id"><DetailsPageLanding/></Route>
                            <Route path="/favs"><FavoritesPageIndex/></Route>
                            <Route path="/map/:search/:latitude/:longitude"><Map/></Route>
                        </Switch>
                    </div>

                </Router>
            </>
        );
    }
}

export default Main;
