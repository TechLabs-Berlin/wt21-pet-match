/* NOT IN USE -> can be deleted - when cleaning UP project */
import React from 'react';
import { Link } from 'react-router-dom';

const HeaderState = (props) => {
    const userId = sessionStorage.getItem("userId");
    const loggedIn = sessionStorage.getItem("loggedIn");
    const loginState = sessionStorage.getItem("loginState");

    if (userId > 0 && loggedIn) {
        sessionStorage.setItem("loginState", 'O');
        return (
            <Link to={props.cfgData.FE_ROUTE_LOGOUT}>
                <button className="navbar__log_in" type="button">{props.cfgData.FE_ROUTE_LOGOUT_MENUITEM}</button>
            </Link>
        );
    }
    else {
        sessionStorage.setItem("loginState", 'I');
        return (
            <Link to={props.cfgData.FE_ROUTE_LOGIN}>
                <button className="navbar__log_in" type="button">{props.cfgData.FE_ROUTE_LOGIN_MENUITEM}</button>
            </Link>
        );
    }
};

export default HeaderState;