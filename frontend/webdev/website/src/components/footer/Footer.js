import React from 'react';
import { Link } from 'react-router-dom';
import footerCSS from './Footer.css';

const Footer = (props) => {
    const instaLogo = props.cfgData.LAYOUT_ICONS_PATH + props.cfgData.FOOTER_ICON_INSTAGRAM;
    const instaLogoAlt = props.cfgData.FOOTER_ICON_INSTAGRAM_ALT;
    const facebookLogo = props.cfgData.LAYOUT_ICONS_PATH + props.cfgData.FOOTER_ICON_FACEBOOK;
    const facebookLogoAlt = props.cfgData.FOOTER_ICON_FACEBOOK_ALT;
    const paypalLogo = props.cfgData.LAYOUT_ICONS_PATH + props.cfgData.FOOTER_ICON_PAYPAL;
    const paypalLogoAlt = props.cfgData.FOOTER_ICON_PAYPAL_ALT;

    return ( 
        <footer>
            <ul className="footer__social">
                <li>
                    <a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><img src={instaLogo} alt={instaLogoAlt} id="icon__insta" /></a>
                </li>
                <li>
                    <a href="https://www.facebook.com/" target="_blank" rel="noreferrer"><img src={facebookLogo} alt={facebookLogoAlt} id="icon__fb" /></a>
                </li>
                <li>
                    <a href="https://www.paypal.com/" target="_blank" rel="noreferrer"><img src={paypalLogo} alt={paypalLogoAlt} id="icon__paypal" /></a>
                </li>
            </ul>
            <ul className="footer__nav">
                <li>
                    <Link to={props.cfgData.FE_ROUTE_ABOUTUS}>{props.cfgData.FE_ROUTE_ABOUTUS_MENUITEM}</Link>
                </li>
                <li>
                    <Link to={props.cfgData.FE_ROUTE_HOWITWORKS}>{props.cfgData.FE_ROUTE_HOWITWORKS_MENUITEM}</Link>
                </li>
                <li>
                    <Link to={props.cfgData.FE_ROUTE_PRIVACY}>{props.cfgData.FE_ROUTE_PRIVACY_MENUITEM}</Link>
                </li>
                <li>
                    <Link to={props.cfgData.FE_ROUTE_IMPRINT}>{props.cfgData.FE_ROUTE_IMPRINT_MENUITEM}</Link>
                </li>
            </ul>
        </footer>
    );
};

export default Footer;