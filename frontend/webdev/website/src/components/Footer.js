import React from 'react';
import { Link } from 'react-router-dom';
import instaLogo from '../icons/instagram.svg';
import facebookLogo from '../icons/facebook-circle.svg';
import paypalLogo from '../icons/paypal.svg';

const Footer = () => {
    return (
        <div>
            <footer>
                <ul class="footer__social">
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
                <ul class="footer__nav">
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
        </div>
    );
};

export default Footer;