/* Import react-components */
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import axios from 'axios';
/* Import CSS used only for Header */
import headerCSS from './Header.css';
/* Import project-components */
import HeaderQuiz from './HeaderQuiz';
import HeaderMatch from './HeaderMatch';

const Header = (props) => {
    const [userId, setUserId] = useState(0);
    const [answerId, setAnswerId] = useState(0);
    const [loggedIn, setLoggedIn] = useState(false);
    const [loginState, setLoginState] = useState('I');
    const [quizTaken, setQuizTaken] = useState(false);
    const [logOutClicked, setLogOutClicked] = useState(false);
    const [firstRender, setFirstRender] = useState(true);

    const location = useLocation();

    const clickLogout = e => {
        setLogOutClicked(true);
    }

    function setSessionVar(userId, answerId, loggedIn, loginState, quizTaken) {
        sessionStorage.setItem("userId", userId);
        sessionStorage.setItem("answerId", answerId);
        sessionStorage.setItem("loggedIn", loggedIn);
        sessionStorage.setItem("loginState", loginState);
        sessionStorage.setItem("quizTaken", quizTaken);
    }

    function renderHeaderState() {
        let logoutRoute = location.pathname;

        if ((logoutRoute === props.cfgData.FE_ROUTE_QUESTIONAIRE_START) ||
            (logoutRoute === props.cfgData.FE_ROUTE_MATCHING_RESULT) ||
            (logoutRoute === props.cfgData.FE_ROUTE_CAT_DETAIL) ||
            (logoutRoute === props.cfgData.FE_ROUTE_SEEYOURRESULTS)) {
            logoutRoute = props.cfgData.FE_ROUTE_HOME;
        }
        
        if (userId !== 0 && loggedIn) {
            sessionStorage.setItem("loginState", 'O');
            return (
                <div className="navbar__login_signup">
                    <NavLink to={logoutRoute}>
                        <button onClick={clickLogout} className="button__navbar_login" type="button">{props.cfgData.FE_ROUTE_LOGOUT_MENUITEM}</button>
                    </NavLink>
                </div>
            );
        }
        else {
            sessionStorage.setItem("loginState", 'I');
            return (
                <div className="navbar__login_signup">
                    <NavLink to={props.cfgData.FE_ROUTE_LOGIN}>
                        <button className="button__navbar_login" type="button">{props.cfgData.FE_ROUTE_LOGIN_MENUITEM}</button>
                    </NavLink>                    
                    <NavLink to={props.cfgData.FE_ROUTE_LOGIN_CREATE}>
                        <button className="button__navbar_signup" type="button">{props.cfgData.FE_ROUTE_LOGIN_CREATE_MENUITEM}</button>
                    </NavLink>
                </div>
            );
        }
    }
        
    useEffect(() => {
        if (firstRender === true) {
            setFirstRender(false);
            setUserId('61ef3e4501dc836946e25a2d');
            setAnswerId(1);
            setLoggedIn(true);
            setLoginState('O');
            setQuizTaken(true);
            setSessionVar(userId, answerId, loggedIn, loginState, quizTaken);
        }
        if (logOutClicked === true) {
            setLogOutClicked(false);
            // Logout -> BE
            axios.get('http://localhost:3001/logout', userId)
                .then(response => {
                    setUserId(0);
                    setAnswerId(0);
                    setLoggedIn(false);
                    setLoginState('I');
                    setQuizTaken(false);
                    setSessionVar(userId, answerId, loggedIn, loginState, quizTaken);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    })

    setSessionVar(userId, answerId, loggedIn, loginState, quizTaken);

    const petMatchLogo = props.cfgData.LAYOUT_IMAGES_PATH + props.cfgData.HEADER_PET_MATCH_LOGO;
    const petMatchLogoAlt = props.cfgData.HEADER_PET_MATCH_LOGO_ALT;

    return ( 
        <nav className="navbar">
            <Link to={props.cfgData.FE_ROUTE_HOME}><img src={petMatchLogo} alt={petMatchLogoAlt} className="logo__img" /></Link>
            <ul>
                <li>
                    <HeaderQuiz cfgData={props.cfgData} quizTaken={quizTaken} />
                </li>
                <li>
                    <NavLink to={props.cfgData.FE_ROUTE_HOWITWORKS} >{props.cfgData.FE_ROUTE_HOWITWORKS_MENUITEM}</NavLink>
                </li>
            </ul>
            {renderHeaderState()}
        </nav>
    )
};

export default Header; 
