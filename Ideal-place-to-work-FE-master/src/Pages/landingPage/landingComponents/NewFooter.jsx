import React, {useState} from 'react';
import { Container, Row, Col, Modal } from 'reactstrap'
import Api from '../../../Api';
import LoginModal from "../../login/LoginModal";
import {Link} from "react-router-dom";
import { useEffect } from 'react';
import "../landingComponents/NewFooter.css"
import alpha from "../../../images/AlphaTeam.png"

const NewFooter = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [profilePic, setProfilePic] = useState("")

    const toggle = () => setIsOpen(!isOpen);

    const fetchUser = async() => {
        if(localStorage.getItem('access_token') !== undefined) {
            const me = await Api.fetch('/users/me', "GET", "", {"Authorization": "Bearer " + 
            localStorage.getItem('access_token')})
            console.log(me)
            setProfilePic(me.picture)
        } 
    }

    useEffect(() => {
        fetchUser()
    }, [])

        return (
            <div id="new-footer">
            <Container fluid>
                {/* //not have a max width - fluid bs  */}

                <Row className="footer-items">

                    <Link id="home-link" to="/"><Col id="home"> <span className="footer-options">HOME</span> </Col></Link>

                    <Link to="/favs"><Col id="favs"> <span className="footer-options">FAVES</span>  </Col></Link>


    <div className="login-logout-area">
                    <span className="login-logout-divider"> / </span>
                    {profilePic ? <Col
                        onClick={() => {
                        localStorage.setItem('access_token', undefined)
                        setProfilePic(undefined)}} >
                        <img src={profilePic} id="user-profile-pic"/></Col> :
                        <LoginModal fetchUser={fetchUser} />}
                
                    <Col onClick={() => {
                        localStorage.setItem('access_token', undefined)
                        setProfilePic(undefined)}} id="logout"> 
                        <span className="footer-options">LOGOUT </span>
                        </Col>
                        <span className="login-logout-divider"> / </span>
    </div>

                    <Col className="copyright-items"> 
                    <img src={alpha} id="copyright-img"/> 
                    <p id="copyright"> © Alpha Nomad Team 2020 </p>  </Col>
                    

                </Row>    
            </Container>
        </div>);
    }

export default NewFooter;