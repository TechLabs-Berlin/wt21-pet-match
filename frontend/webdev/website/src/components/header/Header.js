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

    const petMatchLogo = props.cfgData.LAYOUT_IMAGES_PATH + props.cfgData.HEADER_PET_MATCH_LOGO;
    const petMatchLogoAlt = props.cfgData.HEADER_PET_MATCH_LOGO_ALT;
    const petMatchAvatar = props.cfgData.LAYOUT_ICONS_PATH + props.cfgData.HEADER_ICON_AVATAR;
    const petMatchAvatarAlt = props.cfgData.HEADER_ICON_AVATAR_ALT;    

    const clickLogout = e => {
        setLogoutClicked(true);
    }

    function setLocalStorage(userID,firstName,quizTaken,loggedIn,loginState) {
        localStorage.setItem("userID",userID);
        localStorage.setItem("firstName",firstName);
        localStorage.setItem("quizTaken",quizTaken);
        localStorage.setItem("loggedIn",loggedIn);
        localStorage.setItem("loginState",loginState);
    }

    function setUseStateVars() {
        setUserID(localStorage.getItem("userID"));
        setFirstName(localStorage.getItem("firstName"));
        setLoginState(localStorage.getItem("loginState"));
        setQuizTaken(localStorage.getItem("quizTaken"));
        setLoggedIn(localStorage.getItem("loggedIn"));  
    }

    function renderHeaderState() {
        let greetingTXT = props.cfgData.FE_ROUTE_USER_SETTINGS_MENUITEM2;
        let usersFirstName = localStorage.getItem("firstName");
        if (usersFirstName !== null && usersFirstName !== "") {
            greetingTXT = "Hi, " + usersFirstName;
        }
        /* when user clicks on logout, make sure to leave pages whose content       */
        /* depends on whether the user is logged in or not; show home page instead */
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
        if (firstRendered === false) {
            if (!((String(localStorage.getItem("loggedIn")) === 'true') || (String(localStorage.getItem("quizTaken")) === 'true'))) {
                setLocalStorage(userID, firstName, quizTaken, loggedIn, loginState);
            }
            else {
                setUseStateVars();
            }
            localStorage.setItem("yourResultsState", "");
            setFirstRendered(true);
            setLogoutClicked(false);
        }
        else {
            setUseStateVars();
        }
    });

    useEffect(() => {
        if (logoutClicked === true) {
            setLogoutClicked(false);

            // invoke logout -> BE
            axios.delete('http://localhost:3001/logout', userID)
                .then(res => {
                    if (parseInt(res.status) === 200) {
                        setUserID('');
                        setFirstName('');
                        setQuizTaken(false);
                        setLoggedIn(false);
                        setLoginState('I');
                        localStorage.clear();
                        setLocalStorage('', '', false, false, 'I');
                        localStorage.setItem("yourResultsState","");
                    }
                    else {
                        console.log("Header: /logout - not OK, state: "+res.status+", msg: "+res.statusText);
                    }
                })
                .catch(error => {
                    console.log("Header: /logout - catch, " + error);
                });
        }
    }, [logoutClicked]);

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
