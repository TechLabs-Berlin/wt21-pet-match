import React, { useEffect, useState } from 'react';
import { Redirect } from "react-router";
import axios from 'axios';
import seeYourResultsCSS from './SeeYourResults.css';

const SeeYourResults = (props) => {
    const [userRecord, setUserRecord] = useState({
        userID: 0,
        quizTaken: false,
        firstname: '',
        lastname: '',
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
    
    let chosenAnswer = [], errorMsgToShow = '', tmpObj; 
    let userFromDB = {
        userID: 0,
        quizTaken: false,
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        memberAccount: false,
        acceptedConsent: false
    };

    console.log("... begin: SeeYourResults ...");
    
    useEffect(() => {
        if (localStorage.getItem("loggedIn") === true) {
            setLoggedIn(true);
        }
        if (localStorage.getItem("yourResultsState") !== "") {
            setYourResultsState(localStorage.getItem("yourResultsState"));
        }        

        if (localStorage.getItem("chosenAnswer") !== null && localStorage.getItem("chosenAnswer").length !== 0) {
            chosenAnswer = JSON.parse(localStorage.getItem("chosenAnswer"));
            console.log(chosenAnswer);
            setAnswerArr(chosenAnswer[0]);
        }

        /* if 'Match History' invoked -> show machtes immediately ... no user-action before needed ... */
        console.log('Props: ' + quizTakenNow + ', ' + loggedIn + ', ' + yourResultsState);
        if (yourResultsState === 'YM') {
            if (loggedIn === false) {
                if (chosenAnswer[0].allChosenAnswer.length > 0 && quizTakenNow === true) {
                    setYourResultsState('VR');
                    setSeeMachtingResultPage(true);
                    setBackendDone(false);
                    setReRender(true);
                }
                else {
                    localStorage.setItem("quizTaken", false);
                    setSeeHomePage(true);
                }
            }
            else {
                console.log("/yourmatchesresult: userID: " + chosenAnswer[0].userID);
                tmpObj = { userID: chosenAnswer[0].userID}
                axios.post('http://localhost:3001/yourmatchesresult',tmpObj)
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
                        userFromDB.firstname = jRes.firstname;
                        userFromDB.lastname = jRes.lastname;
                        userFromDB.email = jRes.email;
                        userFromDB.password = jRes.password;
                        userFromDB.quizTaken = jRes.quizTaken;
                        userFromDB.memberAccount = jRes.memberAccount;
                        userFromDB.acceptedConsent = jRes.acceptedConsent;
                        setUserRecord(userFromDB);
                        setSeeMachtingResultPage(true);
                        setBackendDone(true);
                        localStorage.setItem("quizTaken", userFromDB.quizTaken);
                        localStorage.setItem("userId", userFromDB.userId);
                        localStorage.setItem("firstName", userFromDB.firstName);
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
                        localStorage.setItem("userId", userFromDB.userId);
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
                axios.patch('http://localhost:3001/retakequiz', answerArr)
                    .then (res => {
                        if (parseInt(res.status) === 200) {
                            console.log(" ... SeeYourResult, useEffect, axios.post, then, if status = 200 ...");
                            console.log(res.data);
                            return res.data;
                        } 
                        else {
                            console.log("SeeYourResults: /retakequiz - nicht OK, Status: "+res.status+", Msg: "+res.statusText);
                        }
                    }).then(jRes => {
                        console.log(" ... SeeYourResult, useEffect, axios.post, then, then, jsonRes ...");
                        console.log(jRes);
                        setResultArr(jRes);
                        userFromDB.userID = jRes.userID;
                        userFromDB.firstname = jRes.firstname;
                        userFromDB.lastname = jRes.lastname;
                        userFromDB.email = jRes.email;
                        userFromDB.password = jRes.password;
                        userFromDB.quizTaken = jRes.quizTaken;
                        userFromDB.memberAccount = jRes.memberAccount;
                        userFromDB.acceptedConsent = jRes.acceptedConsent;
                        setUserRecord(userFromDB);
                        setSeeMachtingResultPage(true);
                        setBackendDone(true);
                        localStorage.setItem("quizTaken", userFromDB.quizTaken);
                        localStorage.setItem("userId", userFromDB.userId);
                        localStorage.setItem("firstName", userFromDB.firstName);
                    })
                    .catch(error => {
                        console.log(" ... SeeYourResult, useEffect, axios.post, catch ...");
                        console.log("SeeYourResults: /retakequiz - catch, "+error);
                        setBackendError(true);
                        setBackendErrorMsg(error);
                        setBackendDone(false);
                    });                 
            }
            else if (yourResultsState === 'CR') {
                axios.post('http://localhost:3001/register', answerArr)
                    .then (res => {
                        if (parseInt(res.status) === 200) {
                            console.log(" ... SeeYourResult, useEffect, axios.post, then, if status = 200 ...");
                            console.log(res.data);
                            return res.data;
                        } 
                        else {
                            console.log("SeeYourResults: /register - nicht OK, Status: "+res.status+", Msg: "+res.statusText);
                        }
                    }).then(jRes => {
                        console.log(" ... SeeYourResult, useEffect, axios.post, then, then, jsonRes ...");
                        console.log(jRes);
                        setResultArr(jRes);
                        userFromDB.userID = jRes.userID;
                        userFromDB.firstname = jRes.firstname;
                        userFromDB.lastname = jRes.lastname;
                        userFromDB.email = jRes.email;
                        userFromDB.password = jRes.password;
                        userFromDB.quizTaken = jRes.quizTaken;
                        userFromDB.memberAccount = jRes.memberAccount;
                        userFromDB.acceptedConsent = jRes.acceptedConsent;
                        setUserRecord(userFromDB);
                        setSeeMachtingResultPage(true);
                        setBackendDone(true);
                        localStorage.setItem("quizTaken", userFromDB.quizTaken);
                        localStorage.setItem("userId", userFromDB.userId);
                        localStorage.setItem("firstName", userFromDB.firstName);
                    })
                    .catch(error => {
                        console.log(" ... SeeYourResult, useEffect, axios.post, catch ...");
                        console.log("SeeYourResults: /register - catch, "+error);
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
        console.log("... begin: SeeYourResults, useEffect, [userRecord] ... ");
        console.log("... end: SeeYourResults useEffect, [userRecord] ... ");
    }, [userRecord]);    

    const onClickViewResult = e => {
        e.preventDefault();
        /* ... user finished questionaire right now and clicked on button view results ... */
        console.log("... begin: onClickViewResult ...");
        console.log(quizTakenNow);
        console.log(loggedIn);
        if (quizTakenNow && !(loggedIn)) {
            console.log('... onClickViewResult, if condition OK ...');
            setYourResultsState('VR');
            setSeeMachtingResultPage(true);
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

        if (userRecord.firstName === '') {
            setBackendErrorMsg("Error! First name field is required*.");
        }
        else if (userRecord.email === '') {
            setBackendErrorMsg("Error! Email field is required*.");
        }
        else if (userRecord.password === '') {
            setBackendErrorMsg("Error! Password field is required*.");
        }
        else if (String(userRecord.acceptedConsent) !== 'true') {
            setBackendErrorMsg("Error! Please agree with Privacy Policy before we proceed.");
        }
        else {
            if (quizTakenNow && !loggedIn) {
                console.log('... onClickCreate, if condition OK ...');
                setYourResultsState('CR');
                setSeeMachtingResultPage(true);
                setBackendErrorMsg('');
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
                <div align="center" className="errormsg"><br />{pErrMsg}&nbsp;<br /><br /></div>
            );
        }
    }

    console.log("... end: SeeYourResults ...");

    // if BE route did not well, show why ...
    if (backendError) {
        errorMsgToShow = backendErrorMsg;
    }

    /* if something went wrong ... and could not be resolved -> go to home - page */
    if (seeHomePage) {
        return (
            <Redirect to={{ pathname: props.cfgData.FE_ROUTE_HOME }} />
        );
    }
    else if (seeMachtingResultPage && backendDone) {
        /* user actions & getting matching results done successfully -> show up matching results - page */        
        console.log("... SeeYourResults, before Redirect (1) ...");
        console.log(resultArr);
        console.log("... SeeYourResults, before Redirect (2) ...");
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
                        <input onChange={fieldChanged} type="text" name="firstname" id="firstname" value={userRecord.firstname} placeholder="Your first name" required />
                        <input onChange={fieldChanged} type="text" name="lastname" id="lastname" value={userRecord.lastname} placeholder="Your last name" required />
                        <input onInput={fieldChanged} type="email" name="email" id="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" value={userRecord.email} placeholder="Your email" required />
                        <input onInput={fieldChanged} type="password" name="password" id="password" value={userRecord.password} 
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters."
                            placeholder="Choose a password" required />
                        <label htmlFor="acceptedConsent">
                            <input onChange={fieldChanged} required type="checkbox" id="acceptedConsent" name="acceptedConsent" value={userRecord.acceptedConsent} />&nbsp;
                            I inderstand that my personal data will be processed in accordance with Pet Match's <a href="/privacy">Privacy Policy</a>.
                        </label>
                    </form>
                    <div className="container__button_signup_submit">
                        <button type="submit" onClick={onClickCreate} form="signup_results_page" className="button__signup_submit">Create Account</button>
                    </div>
                    <div className="container__login">
                        <p>Already have an account? <a href="/login">Log in</a></p>
                    </div>
                </div>
                {renderErrMsg(errorMsgToShow)}
            </main>
        );    
    }
};
export default SeeYourResults;
