import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import axios from 'axios';
import HeaderQuiz from './HeaderQuiz';
import headerCSS from './Header.css';

const Header = (props) => {
    const [userID, setUserID] = useState('');
    const [firstName, setFirstName] = useState('');
    const [quizTaken, setQuizTaken] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [loginState, setLoginState] = useState('I');
    const [logoutClicked, setLogoutClicked] = useState(false);
    const [firstRendered, setFirstRendered] = useState(false);

    const location = useLocation();
    let logoutRoute = location.pathname;

    console.log("====== Header - begin: ======");
    console.log(localStorage);
    console.log("-----------------------------");
    console.log("UserID: "+userID+", FirstName: "+firstName+", loggedIn: "+loggedIn+", quizTaken: "+quizTaken);
    console.log("====== Header - end: ======");

    const clickLogout = e => {
        setLogoutClicked(true);
    }

    function setLocalStorage(userId,firstName,quizTaken,loggedIn,loginState) {
        localStorage.setItem("userID",userID);
        localStorage.setItem("firstName",firstName);
        localStorage.setItem("quizTaken",quizTaken);
        localStorage.setItem("loggedIn",loggedIn);
        localStorage.setItem("loginState",loginState);
    }

    function renderHeaderState() {
        let greetingTXT = props.cfgData.FE_ROUTE_USER_SETTINGS_MENUITEM2;
        let usersFirstName = localStorage.getItem("firstName");
        if (usersFirstName !== null && usersFirstName !== "") {
            greetingTXT = "Hi, " + usersFirstName;
        }
        if ((logoutRoute === props.cfgData.FE_ROUTE_QUESTIONAIRE_START) ||
            (logoutRoute === props.cfgData.FE_ROUTE_MATCHING_RESULT) ||
            (logoutRoute === props.cfgData.FE_ROUTE_CAT_DETAIL) ||
            (logoutRoute === props.cfgData.FE_ROUTE_USER_SETTINGS) ||
            (logoutRoute === props.cfgData.FE_ROUTE_SEEYOURRESULTS)) {
            logoutRoute = props.cfgData.FE_ROUTE_HOME;
        }

        if (userID !== '' && String(loggedIn) === 'true') {
            return (
                <div className="navbar__user_logged_in">
                    <div className="user__greeting">
                        <img src={petMatchAvatar} alt={petMatchAvatarAlt} />
                        <NavLink to={props.cfgData.FE_ROUTE_USER_SETTINGS}>{greetingTXT}</NavLink>
                    </div>
                    <div>
                        <NavLink to={logoutRoute}>
                            <button onClick={clickLogout} className="button__navbar_logout" type="button">{props.cfgData.FE_ROUTE_LOGOUT_MENUITEM}</button>
                        </NavLink>
                    </div>
                </div>
            );
        }
        else {
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
        if (localStorage.getItem("userID") === null) {
            localStorage.setItem("userID",userID);
        }
        else {
            setUserID(localStorage.getItem("userID"));
        }
        if (localStorage.getItem("firstName") === null) {
            localStorage.setItem("firstName",firstName);
        }
        else {
            setFirstName(localStorage.getItem("firstName"));
        }
        if (localStorage.getItem("loginState") === null) {
            localStorage.setItem("loginState", loginState);
        }
        else {
            setLoginState(localStorage.getItem("loginState"));
        }
        if (localStorage.getItem("quizTaken") === null) {
            localStorage.setItem("quizTaken", quizTaken);
        }
        else {
            setQuizTaken(localStorage.getItem("quizTaken"));
        }
        if (localStorage.getItem("loggedIn") === null) {
            localStorage.setItem("loggedIn", loggedIn);
        }
        else {
            setLoggedIn(localStorage.getItem("loggedIn"));
        }
        if (firstRendered === false) {
            localStorage.setItem("yourResultsState","");
            setLogoutClicked(false);
            setFirstRendered(true);
        }
    });

    useEffect(() => {
        if (logoutClicked === true) {
            setLogoutClicked(false);
            // Logout -> BE
            axios.delete('http://localhost:3001/logout', userID)
                .then(res => {
                    if (parseInt(res.status) === 200) {
                        setUserID('');
                        setFirstName('');
                        setQuizTaken(false);
                        setLoggedIn(false);
                        setLoginState('I');
                        setLocalStorage('', '', false, false, 'I');
                    }
                    else {
                        console.log("Header: /logout - nicht OK, Status: "+res.status+", Msg: "+res.statusText);
                    }
                })
                .catch(error => {
                    console.log("Header: /logout - catch, " + error);
                });
        }
    }, [logoutClicked]);

    const petMatchLogo = props.cfgData.LAYOUT_IMAGES_PATH + props.cfgData.HEADER_PET_MATCH_LOGO;
    const petMatchLogoAlt = props.cfgData.HEADER_PET_MATCH_LOGO_ALT;
    const petMatchAvatar = props.cfgData.LAYOUT_ICONS_PATH + props.cfgData.HEADER_ICON_AVATAR;
    const petMatchAvatarAlt = props.cfgData.HEADER_ICON_AVATAR_ALT;

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
