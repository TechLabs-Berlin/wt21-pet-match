import React from 'react';
import { Link } from 'react-router-dom';
import logInCSS from './LogIn.css';

const LogIn = (props) => {
    if ((props.loginState)&&(props.loginState != '')) {
        sessionStorage.setItem("loginState", props.loginState);
    }

    const userId = sessionStorage.getItem("userId");
    const loggedIn = sessionStorage.getItem("loggedIn");
    const loginState = sessionStorage.getItem("loginState");

    let loginText = props.cfgData.FE_ROUTE_LOGIN_MENUITEM;

    switch (loginState) {
        case 'I':
            loginText = props.cfgData.FE_ROUTE_LOGIN_MENUITEM;
            break;
        case 'O':
            loginText = props.cfgData.FE_ROUTE_LOGOUT_MENUITEM;            
            break;
        case 'C':
            loginText = props.cfgData.FE_ROUTE_LOGIN_CREATE_BTNTXT;
            break;
    }

    function renderBottomLink() {
        if (loginState === 'O') {
            return '';
        }
        
        let linkText = props.cfgData.FE_ROUTE_LOGIN_TEXT_CREATE;
        let linkRoute = props.cfgData.FE_ROUTE_LOGIN_CREATE;
        let linkItem = props.cfgData.FE_ROUTE_LOGIN_CREATE_MENUITEM;


        if (loginState === 'C') {
            linkText = props.cfgData.FE_ROUTE_LOGIN_CREATE_TEXT_LOGIN;
            linkRoute = props.cfgData.FE_ROUTE_LOGIN_CREATE;
            linkItem = props.cfgData.FE_ROUTE_LOGIN_CREATE_MENUITEM;
            
        }

        return (
            <div align="center">
                <p>
                    {linkText} &nbsp; 
                    <Link to={linkRoute}>{linkItem}</Link>
                </p>
            </div>                
        );
    }
    
    return (
        <main className="homepage">
            <br />
            <div align="center">
                <h1 className="login__h1">{loginText}</h1>
                <form>
                    <div>
                        <label className="login__label">
                            Email:
                            <input required type="email" size="30" name="email" />
                        </label>
                    </div>
                    <div>
                        <label className="login__label">
                            Password:
                            <input required type="password" size="30" name="password" />
                        </label>
                    </div>
                    <div>
                        <button className="login__button">{loginText}</button>
                    </div>
                </form>
            </div>
            <br /> <br /> <br />
            {renderBottomLink()}
        </main>
    );
};

export default LogIn;