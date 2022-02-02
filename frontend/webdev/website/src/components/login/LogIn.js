import React, { useEffect, useState } from 'react';
import { Redirect } from "react-router";
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import logInCSS from './LogIn.css';

const LogIn = (props) => {
    const [userRecord, setUserRecord] = useState({
        userID: 0,
        quizTaken: false,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        memberAccount: true,
        acceptedConsent: false
    });
    const [reRender, setReRender] = useState(false);
    const [goToPageUS, setGoToPageUS] = useState(false);
    const [backendDone, setBackendDone] = useState(false);
    const [errorMsgToShow, setErrorMsgToShow] = useState('');

    let loginText = props.cfgData.FE_ROUTE_LOGIN_MENUITEM;

    /* { "username": "rb2_test@gmail.com", "password": "123456" } */
    let loginState = '', tmpLogin, tmpRecord;

    if ((props.loginState) && (props.loginState !== '')) {
        loginState = props.loginState;
        localStorage.setItem("loginState", props.loginState);
    }
    else {
        localStorage.setItem("loginState", "I");
        loginState = 'I';
    }
    if (loginState === 'C') {
        loginText = props.cfgData.FE_ROUTE_LOGIN_CREATE_BTNTXT;
    }

    useEffect(() => {
    }, [userRecord,errorMsgToShow] );  
    
    useEffect(() => {
        if (loginState === 'C' && reRender === true) {
            console.log(userRecord);
            tmpRecord = { "userID": 0, "answerID": 0, "acceptedConsent": userRecord.acceptedConsent, "firstName": userRecord.firstName, "lastName": userRecord.lastName, "username": userRecord.email, "password": userRecord.password };
            console.log(tmpRecord);
            axios.post('http://localhost:3001/registerbeforequiz', tmpRecord)
                .then(res => {
                    if (res.status === 200) {
                        console.log(res);
                        localStorage.setItem("userID", res.data.userID);
                        localStorage.setItem("firstName", res.data.firstName);
                        localStorage.setItem("quizTaken", res.data.quizTaken);
                        localStorage.setItem("loggedIn", true);
                        localStorage.setItem("loginState", 'O');
                        setGoToPageUS(true);
                        setBackendDone(true);
                    }
                    else {
                        console.log("Login: /registerbeforequiz - nicht OK, Status: " + res.status + ", Msg: " + res.statusText);
                        setErrorMsgToShow("Account creation failed!");
                    }
                })
                .catch(error => {
                    console.log("Login: /registerbeforequiz - catch, " + error);
                    setErrorMsgToShow("Account creation failed!");
                });
        }
        else if (loginState === 'I' && reRender === true) {
            tmpLogin = {
                "username": userRecord.email,
                "password": userRecord.password
            };
            console.log(tmpLogin);
            axios.post('http://localhost:3001/login', tmpLogin)
                .then(res => {
                    if (res.status === 200) {
                        console.log(res.data);
                        localStorage.setItem("userID", res.data.userID);
                        localStorage.setItem("firstName", res.data.firstName);
                        localStorage.setItem("quizTaken", res.data.quizTaken);
                        localStorage.setItem("loggedIn", true);
                        localStorage.setItem("loginState", 'O');
                        setGoToPageUS(true);  
                        setBackendDone(true);
                        setErrorMsgToShow("");
                    }
                    else {
                        console.log("Login: /login - not OK, Status: " + res.status + ", Msg: " + res.statusText);
                        setErrorMsgToShow("Login failed!");
                    }
                })
                .catch(error => {
                    console.log("Login: /login - catch, " + error);
                    setErrorMsgToShow("Login failed!");
                });
        }
        setReRender(false);
    }, [reRender, backendDone]);

    const fieldChanged = e => {
        const { name, value } = e.target;
        /* if input-field changed, save new value in state variable userRecord */
        setUserRecord(prevRecord => {
            return {
                ...prevRecord,
                [name]: value
            }
        });
    };

    const onClickCreate = e => {
        e.preventDefault();

        if (userRecord.firstName === '' && loginState === 'C') {
            setErrorMsgToShow ("Error! First name field is required*.");
        }
        else if (userRecord.email === '') {
            setErrorMsgToShow ("Error! Email field is required*.");
        }
        else if (userRecord.password === '') {
            setErrorMsgToShow("Error! Password field is required*.");
        } 
        else if (String(userRecord.acceptedConsent) !== 'true') {
            /* do this only if in mode create new account */
            if (loginState === 'C') {
                setErrorMsgToShow("Error! Please agree with Privacy Policy before we proceed.");
            }
            else {
                setErrorMsgToShow("");
                setReRender(true);                
            }
        }
        else {
            setErrorMsgToShow("");
            setReRender(true);
        }       
    };   
    
    function renderConsent(loginState) {
        if (loginState === 'C') {
            if (userRecord.acceptedConsent === true) {
                return (
                    <label htmlFor="acceptedConsent">
                        <input checked onInput={fieldChanged} required type="checkbox" id="acceptedConsent" name="acceptedConsent" value="true" />&nbsp;
                        I inderstand that my personal data will be processed in accordance with Pet Match's&nsp;
                        <NavLink to={props.cfgData.FE_ROUTE_PRIVACY}>{props.cfgData.FE_ROUTE_PRIVACY_MENUITEM2}</NavLink>.
                    </label>
                );
            }
            else {
                return (
                    <label htmlFor="acceptedConsent">
                        <input onInput={fieldChanged} required type="checkbox" id="acceptedConsent" name="acceptedConsent" value="true" />&nbsp;
                        I inderstand that my personal data will be processed in accordance with Pet Match's&nbsp;
                        <NavLink to={props.cfgData.FE_ROUTE_PRIVACY}>{props.cfgData.FE_ROUTE_PRIVACY_MENUITEM2}</NavLink>.
                    </label>
                );
            }
        }
        else {
            return ('');
        }
    }

    function renderFirstName(loginState) {
        if (loginState === 'C') {
            return (
                <input onChange={fieldChanged} type="text" name="firstName" id="firstName" value={userRecord.firstName} placeholder="Your first name*" required />
            );
        }
        else {
            return ('');
        }
    }

    function renderLastName(loginState) {
        if (loginState === 'C') {
            return (
                <input onChange={fieldChanged} type="text" name="lastName" id="lastName" value={userRecord.lastName} placeholder="Your last name" required />
            );
        }
        else {
            return ('');
        }
    }

    function renderLoginQuestion(pLoginState) {
        if (pLoginState === 'C') {
            return(
                <div className="container__login">
                    <p>Already have an account?&nbsp;
                        <NavLink to={props.cfgData.FE_ROUTE_LOGIN}>{props.cfgData.FE_ROUTE_LOGIN_MENUITEM}</NavLink> 
                    </p>
                </div>
            );
        }
    }

    function renderErrMsg(pErrorMsgToShow) {
        if (pErrorMsgToShow !== '') {
            return (
                <div className="error__signup"><p>{pErrorMsgToShow}</p></div>
            );
        }
    }

    if (goToPageUS && backendDone) {
        return (
            <Redirect to={{ pathname: props.cfgData.FE_ROUTE_USER_SETTINGS }} />
        );

    }
    else {
        return (
            <main className="main__signup_page">
                <div className="container__signup_page">
                    <div className="container__signup_option">
                        <h2>{loginText}</h2>
                    </div>
                    <form className="form__signup" id="signup_page">
                        {renderFirstName(loginState)}
                        <input onInput={fieldChanged} type="email" name="email" id="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" value={userRecord.email} placeholder="Your email*" required />
                        <input onInput={fieldChanged} type="password" name="password" id="password" value={userRecord.password}
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters."
                            placeholder="Choose a password*" required />
                        {renderConsent(loginState)}
                    </form>
                    <div className="container__button_signup_submit">
                        <button type="submit" onClick={onClickCreate} form="signup_results_page" className="button__signup_submit">{loginText}</button>
                    </div>
                    {renderLoginQuestion(loginState)}
                    {renderErrMsg(errorMsgToShow)}
                </div>
            </main>
        );
    }
};
export default LogIn;