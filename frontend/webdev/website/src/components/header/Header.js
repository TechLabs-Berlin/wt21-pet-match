import React from 'react';
import { Link } from 'react-router-dom';
import headerCSS from './Header.css';
import petMatchLogo from '../../images/img/petmatch-dummy-logo.png';

const Header = (props) => {
    const petMatchLogoDyn = props.imagesPath + 'petmatch-dummy-logo.png';
    
    return ( 
        <nav className="navbar">
            <Link to="/"><img src={petMatchLogo} alt="Pet Match - Logo" className="logo__img" /></Link>
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
                    <Link to="/shelter">Shelter Area</Link>
                </li>
            </ul>
            <Link to="/login"><button className="navbar__log_in" type="button">Log In</button></Link>
        </nav>
    );
};

export default Header;
