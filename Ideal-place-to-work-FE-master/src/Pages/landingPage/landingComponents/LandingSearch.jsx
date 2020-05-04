import React, { useState } from "react";
import { Input } from "reactstrap";
import {Link} from 'react-router-dom';
import searchIcon from "../../../icons/Search.png";
import mapIcon from "../../../icons/Pin02.png";
import closeIcon from "../../../icons/close.png";
import { useEffect } from "react";


const LandingSearch = (props) => {
  const [searchPlace, setSearchPlace] = useState("")
  const [recentSearches, setRecentSearches] = useState([])
  const [searchOpen, setSearchOpen] = useState(false)

  const openSearch = (e) => {
    setSearchOpen(true)
    console.log(e.target.value)
  };

  useEffect(() => {
    if(localStorage.getItem('places')) {
      const places = localStorage.getItem('places');
      const placesArr = places.split(',')
      setRecentSearches(placesArr)
    }
  }, [])

  const handleSearch = (e) => {
    if((e.key === 'Enter')) {
      const places = [];
      let plFromLC = localStorage.getItem('places')
      if(plFromLC) {
        const arrayFromLS = plFromLC.split(',')
        console.log(arrayFromLS)
        places.push(searchPlace)
        console.log(places)
        // eslint-disable-next-line no-mixed-operators
        for(var i = 0; i < 4; i++) {
          places.push(arrayFromLS[i])
        }
      } else {
        places.push(searchPlace)
      }
      localStorage.setItem('places', places);
      setRecentSearches(places);
      setTimeout(() => {
        props.skip()
        props.fetchResults(searchPlace)
        setSearchOpen(false)
      }, 500)
    }
  }

    return (
      <div className="search-container">
        <div className={searchOpen ? "searchRow-toggled" : "searchRow"}>
          <div>
            <img src={searchIcon} className={searchOpen ? "searchIcon-toggled" : "searchIcon"} alt="searchIcon" />
          </div>
          <div className="search-input-text">
            <Input
              id={searchOpen ? 'searchInput-toggled' : "searchInput"}
              type="text"
              placeholder="example: Costa Coffee"
              value={searchPlace}
              onClick={(e) => openSearch(e)}
              onKeyPress={handleSearch}
              onChange={(e) => setSearchPlace(e.target.value)} />
          </div>
          <div>
            <img src={closeIcon} onClick={() => setSearchOpen(false)} className={searchOpen ? "close-icon" : "results-map"} alt="searchIcon" />
          </div>
          <div className={searchOpen ? "results-map-toggled" : "results-map"}>
            <Link to={"/map/" + searchPlace + "/" + props.location.latitude + "/" + props.location.longitude} style={{color: 'black'}}>
            <div className='map-div-search'>
              <img src={mapIcon} className="map-icon" alt="searchIcon" />
              <h3>Show map</h3>
            </div>
            </Link>
          </div>
          {searchOpen && <div className='recent-searches-div'>
            <h2>Recent Searches</h2>
            {recentSearches ? recentSearches.map((search, i) => 
              <h2 onClick={(e) => {
                console.log('yo')
                console.log(search)
                setSearchPlace(search)
            }} style={{paddingLeft: '10px', fontFamily: 'Roboto', fontWeight: '400'}} key={i}>{search}</h2>
            ) : <h2 style={{paddingLeft: '10px', fontFamily: 'Roboto', fontWeight: '400'}}>No recent searches</h2>}
          </div>}
        </div>
      </div>
  );
}

export default LandingSearch;
