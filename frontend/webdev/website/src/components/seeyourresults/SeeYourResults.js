import React, { useEffect, useState } from 'react';
import { Redirect } from "react-router";
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import seeYourResultsCSS from './SeeYourResults.css';

const SeeYourResults = (props) => {
    const [userRecord, setUserRecord] = useState({
        userID: 0,
        quizTaken: false,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        memberAccount: false,
        acceptedConsent: false
    });

    const [quizTakenNow, setQuizTakenNow] = useState(props.quizTaken);
    const [loginState, setLoginState] = useState(props.loginState);
    const [yourResultsState, setYourResultsState] = useState(props.yourResultsState);
    const [loggedIn, setLoggedIn] = useState(false);
    const [answerArr, setAnswerArr] = useState({});
    const [resultArr, setResultArr] = useState({});
    const [seeMachtingResultPage, setSeeMachtingResultPage] = useState(false);
    const [seeHomePage, setSeeHomePage] = useState(false);
    const [reRender, setReRender] = useState(false);
    const [backendDone, setBackendDone] = useState(false);    
    const [backendError, setBackendError] = useState(false);
    const [backendErrorMsg, setBackendErrorMsg] = useState('');
    const [frontendErrorMsg, setFrontendErrorMsg] = useState('');    
    
    let chosenAnswer = [], errorMsgToShow = ''; 
    let tmpUserID = {
        userID: 0
    };

    let userFromDB = {
        userID: 0,
        quizTaken: false,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        memberAccount: false,
        acceptedConsent: false
    };
    let createAccountRecord = {
        userID: 0,
        quizTaken: false,
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        memberAccount: true,
        acceptedConsent: true,
        allChosenAnswer: []
    }
    console.log("============== begin: SeeYourResults ==============");
    
    useEffect(() => {
        let tmp = String(localStorage.getItem("loggedIn"));
        console.log(tmp);
        if (String(localStorage.getItem("loggedIn")) === 'true') {
            setLoggedIn(true);
        }
        if (localStorage.getItem("yourResultsState") !== "") {
            setYourResultsState(localStorage.getItem("yourResultsState"));
        }

        if (localStorage.getItem("chosenAnswer") !== null && localStorage.getItem("chosenAnswer").length !== 0) {
            chosenAnswer = JSON.parse(localStorage.getItem("chosenAnswer"));
            chosenAnswer[0].userID = localStorage.getItem("userID");
            //console.log(chosenAnswer);
            setAnswerArr(chosenAnswer[0]);
        }

        /* if 'Match History' invoked -> show machtes immediately ... no user-action before needed ... */
        console.log(chosenAnswer);
        console.log('UseEffect (first) - Props: ' + quizTakenNow + ', ' + loggedIn + ', ' + yourResultsState);
        console.log(localStorage.getItem("loggedIn"));
        console.log(localStorage.getItem("userID"));
        if (yourResultsState === 'YM') {
            if (String(localStorage.getItem("loggedIn")) === 'false') {
                if ((chosenAnswer.length !== 0) && quizTakenNow === true) {
                    setYourResultsState('VR');
                    setSeeMachtingResultPage(true);
                    setBackendDone(false);
                    setReRender(true);
                }
                else {
                    /* FALSCHE REAKTION: sollte eigentlich besser zur ersten Seite vom Quiz gehen ... da es nur ein begonnenes Quiz gibt ... */
                    /* -> daher: wenn quiz begonnen wird und chosenAnswer resettet wird -> Match History auch deaktivieren */
                    localStorage.setItem("quizTaken", false);
                    setSeeHomePage(true);
                }
            }
            else {
                tmpUserID.userID = localStorage.getItem("userID");
                console.log("/yourmatchesresult: userID: " + tmpUserID.userID);
                axios.post('http://localhost:3001/yourmatchesresult',tmpUserID)
                    .then (res => {
                        if (parseInt(res.status) === 200) {
                            console.log(" ... SeeYourResult, useEffect, axios.post, then, if status = 200 ...");
                            console.log(res.data);
                            return res.data;
                        } 
                        else {
                            console.log("SeeYourResults: /yourmatchesresult - nicht OK, Status: "+res.status+", Msg: "+res.statusText);
                        }
                    }).then(jRes => {
                        console.log(" ... SeeYourResult, useEffect, axios.post, then, then, jsonRes ...");
                        console.log(jRes);
                        setResultArr(jRes);
                        userFromDB.userID = jRes.userID;
                        userFromDB.quizTaken = jRes.quizTaken;
                        setUserRecord(userFromDB);
                        setSeeMachtingResultPage(true);
                        setBackendDone(true);
                        localStorage.setItem("quizTaken", userFromDB.quizTaken);
                        localStorage.setItem("userID", userFromDB.userID);
                    })
                    .catch(error => {
                        console.log(" ... SeeYourResult, useEffect, axios.post, catch ...");
                        console.log("SeeYourResults: /yourmatchesResult - catch, "+error);
                        setBackendError(true);
                        setBackendErrorMsg(error);
                        setBackendDone(false);
                    }); 

            }
        }
    }, []);

    useEffect(() => {
        if ((yourResultsState !== '') && !(backendDone) && (reRender)) {
            console.log("... SeeYourResults, useEffect, yourResultsState set and backend not done and should be re-rendered ... ");
            console.log(answerArr);
            if (yourResultsState === 'VR') {
                console.log("... SeeYourResults, useEffect, yourResultsState = /viewresult ... ");
                axios.post('http://localhost:3001/viewresult',answerArr)
                    .then (res => {
                        if (parseInt(res.status) === 200) {
                            console.log(" ... SeeYourResult, useEffect, axios.post, then, if status = 200 ...");
                            console.log(res.data);
                            return res.data;
                        } 
                        else {
                            console.log("SeeYourResults: /viewresult - nicht OK, Status: "+res.status+", Msg: "+res.statusText);
                        }
                    }).then(jRes => {
                        console.log(" ... SeeYourResult, useEffect, axios.post, then, then, jsonRes ...");
                        console.log(jRes);
                        setResultArr(jRes);
                        userFromDB.userID = jRes.userID;
                        userFromDB.quizTaken = jRes.quizTaken;
                        setUserRecord(userFromDB);
                        setSeeMachtingResultPage(true);
                        setBackendDone(true);
                        localStorage.setItem("quizTaken", userFromDB.quizTaken);
                        localStorage.setItem("userID", userFromDB.userID);
                    })
                    .catch(error => {
                        console.log("SeeYourResults: /viewresult - catch, "+error);
                        setBackendError(true);
                        setBackendErrorMsg(error);
                        setBackendDone(false);
                    }); 
                console.log(" ... SeeYourResult, useEffect, after axios.post /viewresult ...");
                console.log(resultArr);
            }
            else if (yourResultsState === 'RT') {
                console.log("/retakequiz: userID: " + answerArr.userID);
                console.log(answerArr);
                console.log(userRecord.userID);
                console.log(localStorage.getItem("userID"));
                
                axios.patch('http://localhost:3001/retakequiz', answerArr)
                    .then (res => {
                        if (parseInt(res.status) === 200) {
                            console.log(" ... SeeYourResult, useEffect, axios.patch, then, if status = 200 ...");
                            console.log(res.data);
                            return res.data;
                        } 
                        else {
                            console.log("SeeYourResults: /retakequiz - nicht OK, Status: "+res.status+", Msg: "+res.statusText);
                        }
                    }).then(jRes => {
                        console.log(" ... SeeYourResult, useEffect, axios.patch, then, then, jsonRes ...");
                        console.log(jRes);
                        setResultArr(jRes);
                        userFromDB.userID = jRes.userID;
                        userFromDB.quizTaken = jRes.quizTaken;
                        setUserRecord(userFromDB);
                        setSeeMachtingResultPage(true);
                        setBackendDone(true);
                        localStorage.setItem("quizTaken", userFromDB.quizTaken);
                        localStorage.setItem("userID", userFromDB.userID);
                    })
                    .catch(error => {
                        console.log(" ... SeeYourResult, useEffect, axios.patch, catch ...");
                        console.log("SeeYourResults: /retakequiz - catch, "+error);
                        setBackendError(true);
                        setBackendErrorMsg(error);
                        setBackendDone(false);
                    });                 
            }
            else if (yourResultsState === 'CR') {
                console.log("/registerafterquiz: userID: " + answerArr.userID);
                console.log(answerArr);
                createAccountRecord.userID = 0;
                createAccountRecord.answerID = 0;
                createAccountRecord.firstName = userRecord.firstName;
                createAccountRecord.username = userRecord.email;
                createAccountRecord.password = userRecord.password;
                createAccountRecord.allChosenAnswer = answerArr.allChosenAnswer;
                console.log(createAccountRecord);
                axios.post('http://localhost:3001/registerafterquiz', createAccountRecord)
                    .then (res => {
                        if (parseInt(res.status) === 200) {
                            console.log(" ... SeeYourResult, useEffect, axios.post, then, if status = 200 ...");
                            console.log(res.data);
                            return res.data;
                        } 
                        else {
                            console.log("SeeYourResults: /registerafterquiz - nicht OK, Status: "+res.status+", Msg: "+res.statusText);
                        }
                    }).then(jRes => {
                        console.log(" ... SeeYourResult, useEffect, axios.post, then, then, jsonRes ...");
                        console.log(jRes);
                        setResultArr(jRes);
                        userFromDB.userID = jRes.userID;
                        userFromDB.firstName = jRes.firstName;
                        userFromDB.quizTaken = jRes.quizTaken;
                        userFromDB.lastName = '';
                        userFromDB.password = '';
                        userFromDB.email = '';
                        localStorage.setItem("loggedIn", true);
                        localStorage.setItem("quizTaken", jRes.quizTaken);
                        localStorage.setItem("userID", jRes.userID);
                        localStorage.setItem("firstName", jRes.firstName);
                        setUserRecord(userFromDB);
                        setSeeMachtingResultPage(true);
                        setBackendDone(true);
                    })
                    .catch(error => {
                        console.log(" ... SeeYourResult, useEffect, axios.post, catch ...");
                        console.log("SeeYourResults: /registerafterquiz - catch, "+error);
                        setBackendError(true);
                        setBackendErrorMsg(error);
                        setBackendDone(false);
                    });                 
            }

        }
        console.log("... end: SeeYourResults useEffect, [reRender] ... ");
        setReRender(false);
    }, [reRender]);

    useEffect(() => {
        console.log("... begin: SeeYourResults, useEffect, [userRecord, frontendErrorMsg] ... ");
        console.log("... end: SeeYourResults useEffect, [userRecord, rontendErrorMsg] ... ");
    }, [userRecord, frontendErrorMsg]);    

    const onClickViewResult = e => {
        e.preventDefault();
        /* ... user finished questionaire right now and clicked on button view results ... */
        console.log("... begin: onClickViewResult ...");
        console.log(quizTakenNow);
        console.log(loggedIn);
        if (quizTakenNow) {
            if (!loggedIn) {
                setYourResultsState('VR');
                console.log('... onClickViewResult, quiz is taken ... (VR) ...');
            }
            else {
                setYourResultsState('RT');
                console.log('... onClickViewResult, quiz is taken ... (RT) ...');
            }
            setSeeMachtingResultPage(true);
            setFrontendErrorMsg('');
            setReRender(true);
        }
        console.log("... end: onClickViewResult ...");
    };

    const onClickCreate = e => {
        e.preventDefault();
        /* ... user finished questionaire right now and clicked on button view results ... */
        console.log("... begin: onClickCreate ...");
        console.log(quizTakenNow);
        console.log(loggedIn);

        if (loggedIn) {
            setFrontendErrorMsg("Error! You are already logged in.");
        }
        else if (userRecord.firstName === '') {
            setFrontendErrorMsg("Error! First name field is required*.");
        }
        else if (userRecord.email === '') {
            setFrontendErrorMsg("Error! Email field is required*.");
        }
        else if (userRecord.password === '') {
            setFrontendErrorMsg("Error! Password field is required*.");
        }
        else if (String(userRecord.acceptedConsent) !== 'true') {
            setFrontendErrorMsg("Error! Please agree with Privacy Policy before we proceed.");
        }
        else {
            if (quizTakenNow && !loggedIn) {
                console.log('... onClickCreate, if condition OK ...');
                setYourResultsState('CR');
                setSeeMachtingResultPage(true);
                setFrontendErrorMsg('');
                setReRender(true);
            }
        }
        console.log("... end: onClickCreate ...");        
    };

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

    function renderErrMsg(pErrMsg) {
        if (pErrMsg !== '') {
            return (
                <div className="error__signup">{pErrMsg}</div>
            );
        }
    }

    function renderConsent() {
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

    console.log("============== end: SeeYourResults ==============");

    // if BE route did not well, show why ...
    if (backendError) {
        errorMsgToShow = backendErrorMsg;
    }
    else {
        errorMsgToShow = frontendErrorMsg;
    }
    /* if something went wrong ... and could not be resolved -> go to home - page */
    if (seeHomePage) {
        return (
            <Redirect to={{ pathname: props.cfgData.FE_ROUTE_HOME }} />
        );
    }
    else if (seeMachtingResultPage && backendDone) {
        /* user actions & getting matching results done successfully -> show up matching results - page */        
        console.log("... SeeYourResults, before Redirect to MatchingResult ...");
        console.log(resultArr);
        /* set localStorage - quizTaken -> true */
        localStorage.setItem("quizTaken",true);
        return (
            <Redirect
                to={{
                    pathname: props.cfgData.FE_ROUTE_MATCHING_RESULT,
                    state: { resultArr: {resultArr} }
                }}
            />
        );
    }
    else {
        return ( 
            <main className="questionnaire">
                <div className="container__top_questionnaire">
                    <div className="container__youre_done">
                        <h1 className="questionnaire_done">You're done!</h1>
                    </div>
                    <div className="container__button_results">
                        <button onClick={onClickViewResult} className="button__results">{props.cfgData.FE_ROUTE_SEEYOURRESULTS_MENUITEM}</button>
                    </div>                    
                </div>
                <div className="container__bottom_see_your_results">
                    <div className="container__signup_option">
                        <p>or</p>
                        <h2>Sign up to save your results</h2>
                    </div>
                    <form className="form__signup" id="signup_results_page">
                        <input onChange={fieldChanged} type="text" name="firstName" id="firstName" value={userRecord.firstName} placeholder="Your first name*" required />
                        <input onInput={fieldChanged} type="email" name="email" id="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" value={userRecord.email} placeholder="Your email*" required />
                        <input onInput={fieldChanged} type="password" name="password" id="password" value={userRecord.password} 
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters."
                            placeholder="Choose a password*" required />
                        {renderConsent()}
                    </form>
                    <div className="container__button_signup_submit">
                        <button type="submit" onClick={onClickCreate} form="signup_results_page" className="button__signup_submit">Create Account</button>
                    </div>
                    <div className="container__login">
                        <p>Already have an account? <a href="/login">Log in</a></p>
                    </div>
                    {renderErrMsg(errorMsgToShow)}
                </div>
            </main>
        );    
    }
};
export default SeeYourResults;
