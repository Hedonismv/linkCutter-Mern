import React, {useContext} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

const Navbar = () => {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()

    const logoutHandler = (e) => {
        e.preventDefault()
        auth.logOut()
        navigate('/')
    }

    return (
        <nav>
            <div className="nav-wrapper">
                <span className="brand-logo">Link Shorting Service</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to={'/create'}>Create Link</NavLink></li>
                    <li><NavLink to={'/links'}>My Links</NavLink></li>
                    <li><a href={'/'} onClick={logoutHandler}>Logout</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;