// import React, {useState} from 'react';
// import Home from "../../../icons/Home.png"
// import Heart from "../../../icons/Faves.png"
// import User from "../../../icons/User.png"
// import Api from '../../../Api';
// import LoginModal from "../../login/LoginModal";
// import {Link} from "react-router-dom";
// import { useEffect } from 'react';


// const Footer = (props) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [profilePic, setProfilePic] = useState("")

//     const toggle = () => setIsOpen(!isOpen);

//     const fetchUser = async() => {
//         if(localStorage.getItem('access_token') !== undefined) {
//             const me = await Api.fetch('/users/me', "GET", "", {"Authorization": "Bearer " + localStorage.getItem('access_token')})
//             console.log(me)
//             setProfilePic(me.picture)
//         } 
//     }

//     useEffect(() => {
//         fetchUser()
//     }, [])

//     return (
//         <div>
//             <div className="footer-icons-container">
//                 <Link to="/"> <div className="footer-icon footer-home">
//                     <img src={Home} alt="Home" className="home-icon"/>
//                     <h3 className="home-text">Home</h3>
//                 </div></Link>
//                 <Link to="/favs"><div className="footer-icon footer-heart">
//                     <img src={Heart} alt="Home"/>
//                 </div></Link>
//                 {profilePic ? <div> <img onClick={() => {
//                     localStorage.setItem('access_token', undefined)
//                     set(undefined)
//                 }} className='user-profile-pic' src={profilePic} alt='profile-pic' /> </div> : 
//                     <div className="footer-icon footer-user">
//                     <LoginModal fetchUser={fetchUser} />
//                 </div>}
//             </div>
//         </div>
//     );
// };

// export default Footer;
