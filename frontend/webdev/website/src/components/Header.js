import React from 'react';
import { Link } from 'react-router-dom';
import petMatchLogo from '../img/petmatch-dummy-logo.png';

const Header = () => {
    return ( 
        <nav class="navbar">
            <Link to="/"><img src={petMatchLogo} alt="Pet Match - Logo" class="logo__img" /></Link>
            <ul>
                <li>
                    <Link to="/questionaire/start">Match Quiz</Link>
                </li>
                <li> 
                    <Link to="/howitworks">How it Works</Link>
                </li>
                <li>
                    <Link to="/aboutus">About Us</Link>
                </li>
                <li>
                    <Link to="/shelterarea">Shelter Area</Link>
                </li>
            </ul>
            <div class="navbar__log_in">
                <Link to="/login"><button class="navbar__log_in" type="button">Log In</button></Link>
            </div>
        </nav>
    );
};

export default Header;