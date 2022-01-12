import React from 'react';
import { Link } from 'react-router-dom';
import footerCSS from './Footer.css';
import instaLogo from '../../images/icons/instagram.svg';
import facebookLogo from '../../images/icons/facebook-circle.svg';
import paypalLogo from '../../images/icons/paypal.svg';

const Footer = () => {
    return (
        <footer>
            <ul className="footer__social">
                <li>
                    <a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><img src={instaLogo} alt="instagram icon" id="icon__insta" /></a>
                </li>
                <li>
                    <a href="https://www.facebook.com/" target="_blank" rel="noreferrer"><img src={facebookLogo} alt="facebook icon" id="icon__fb" /></a>
                </li>
                <li>
                    <a href="https://www.paypal.com/" target="_blank" rel="noreferrer"><img src={paypalLogo} alt="paypal icon" id="icon__paypal" /></a>
                </li>
            </ul>
            <ul className="footer__nav">
                <li>
                    <Link to="/aboutus">About Us</Link>
                </li>
                <li>
                    <Link to="/howitworks">How it Works</Link>
                </li>
                <li>
                    <Link to="/imprint">Imprint</Link>
                </li>
            </ul>
        </footer>
    );
};

export default Footer;