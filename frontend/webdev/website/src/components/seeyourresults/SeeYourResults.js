import React, { useEffect, useState } from 'react';
import { Redirect } from "react-router";
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { renderErrMsg, validatePWD, validateEmail } from '../functions/HelperFunctions';
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

    const [yourResultsState, setYourResultsState] = useState(props.yourResultsState);
    const [loggedIn, setLoggedIn] = useState(false);
    const [answerArr, setAnswerArr] = useState({});
    const [resultArr, setResultArr] = useState({});
    const [seeMachtingResultPage, setSeeMachtingResultPage] = useState(false);
    const [seeQuestionairePage, setSeeQuestionairePage] = useState(false);
    const [reRender, setReRender] = useState(false);
    const [backendDone, setBackendDone] = useState(false);    
    const [backendError, setBackendError] = useState(false);
    const [backendErrorMsg, setBackendErrorMsg] = useState('');
    const [frontendErrorMsg, setFrontendErrorMsg] = useState('');  
    
    const quizTakenNow = props.quizTaken; 
    let chosenAnswer = [], errorMsgToShow = '', tmpUserID = { userID: 0 };
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

    function doCatchErrorHandling(pErrTxt,pErrMsg) {
        console.log(pErrTxt+pErrMsg);
        setBackendError(true);
        setBackendErrorMsg(pErrMsg);
        setBackendDone(false);        
    }

    function doSuccessHandling(jRes) {
        setResultArr(jRes);
        userFromDB.userID = jRes.userID;
        userFromDB.quizTaken = jRes.quizTaken;
        setUserRecord(userFromDB);
        setSeeMachtingResultPage(true);
        setBackendDone(true);
        localStorage.setItem("quizTaken", userFromDB.quizTaken);
        localStorage.setItem("userID", userFromDB.userID);        
    }

    function doSuccessCreateHandling(jRes) {
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
    }

    useEffect(() => {
        if (String(localStorage.getItem("loggedIn")) === 'true') {
            setLoggedIn(true);
        }
        if (localStorage.getItem("yourResultsState") !== "") {
            setYourResultsState(localStorage.getItem("yourResultsState"));
        }

        if (localStorage.getItem("chosenAnswer") !== null && localStorage.getItem("chosenAnswer").length !== 0) {
            chosenAnswer = JSON.parse(localStorage.getItem("chosenAnswer"));
            chosenAnswer[0].userID = localStorage.getItem("userID");
            setAnswerArr(chosenAnswer[0]);
        }

        /* if 'Match History' invoked -> show machtes immediately ... no user-action before needed ... */
        if ((yourResultsState === 'YM') &&
            (String(localStorage.getItem("loggedIn")) === 'true') &&
            (quizTakenNow === true) &&
            (localStorage.getItem("chosenAnswer") !== null) &&
            (localStorage.getItem("chosenAnswer").length !== 0)) {
            setYourResultsState('RT');
        }
        else {
            if (yourResultsState === 'YM') {
                if (String(localStorage.getItem("loggedIn")) === 'false') {
                    if ((chosenAnswer.length !== 0) && quizTakenNow === true) {
                        setYourResultsState('VR');
                        setSeeMachtingResultPage(true);
                        setBackendDone(false);
                        setReRender(true);
                    }
                    else {
                        /* ... user has begun a new quiz, but not finished yet ... but is not logged in -> he has do redo quiz ... */
                        localStorage.setItem("quizTaken", false);
                        setSeeQuestionairePage(true);
                    }
                }
                else {
                    tmpUserID.userID = localStorage.getItem("userID");
                    axios.post('http://localhost:3001/yourmatchesresult',tmpUserID)
                        .then (res => {
                            if (parseInt(res.status) === 200) {
                                return res.data;
                            } 
                            else {
                                console.log("SeeYourResults: /yourmatchesresult - not OK, state: "+res.status+", msg: "+res.statusText);
                            }
                        }).then(jRes => {
                            doSuccessHandling(jRes);
                        })
                        .catch(error => {
                            doCatchErrorHandling("SeeYourResults: /yourmatchesresult - catch, ",error);
                        }); 

                }
            }
        }
    }, []);

    useEffect(() => {
        if ((yourResultsState !== '') && !(backendDone) && (reRender)) {
            if (yourResultsState === 'VR') {
                axios.post('http://localhost:3001/viewresult',answerArr)
                    .then (res => {
                        if (parseInt(res.status) === 200) {
                            return res.data;
                        } 
                        else {
                            console.log("SeeYourResults: /viewresult - not OK, state: "+res.status+", msg: "+res.statusText);
                        }
                    }).then(jRes => {
                        doSuccessHandling(jRes);
                    })
                    .catch(error => {
                        doCatchErrorHandling("SeeYourResults: /viewresult - catch, ",error);
                    }); 
            }
            else if (yourResultsState === 'RT') {
                axios.patch('http://localhost:3001/retakequiz', answerArr)
                    .then (res => {
                        if (parseInt(res.status) === 200) {
                            return res.data;
                        } 
                        else {
                            console.log("SeeYourResults: /retakequiz - not OK, state: "+res.status+", msg: "+res.statusText);
                        }
                    }).then(jRes => {
                        doSuccessHandling(jRes);
                    })
                    .catch(error => {
                        doCatchErrorHandling("SeeYourResults: /retakequiz - catch, ",error);
                    });                 
            }
            else if (yourResultsState === 'CR') { 
                createAccountRecord.userID = 0;
                createAccountRecord.answerID = 0;
                createAccountRecord.firstName = userRecord.firstName;
                createAccountRecord.username = userRecord.email;
                createAccountRecord.password = userRecord.password;
                createAccountRecord.allChosenAnswer = answerArr.allChosenAnswer;

                axios.post('http://localhost:3001/registerafterquiz', createAccountRecord)
                    .then (res => {
                        if (parseInt(res.status) === 200) {
                            return res.data;
                        } 
                        else {
                            console.log("SeeYourResults: /registerafterquiz - not OK, state: "+res.status+", msg: "+res.statusText);
                        }
                    }).then(jRes => {
                        doSuccessCreateHandling(jRes);
                    })
                    .catch(error => {
                        doCatchErrorHandling("SeeYourResults: /registerafterquiz - catch, ",error);
                    });                 
            }
        }
        setReRender(false);
    }, [reRender]);

    useEffect(() => {
    }, [userRecord, frontendErrorMsg]);    

    const onClickViewResult = e => {
        e.preventDefault();
        /* ... user finished questionaire right now and clicked on button view results ... */
        if (quizTakenNow) {
            if (!loggedIn) {
                setYourResultsState('VR');
            }
            else {
                setYourResultsState('RT');
            }
            setSeeMachtingResultPage(true);
            setFrontendErrorMsg('');
            setReRender(true);
        }
    };

    const onClickCreate = e => {
        e.preventDefault();
        /* ... user finished questionaire right now and clicked on button create account and save results ... */
        if (loggedIn) {
            setFrontendErrorMsg("Error! You are already logged in.");
            return;
        }
        if (userRecord.firstName === '') {
            setFrontendErrorMsg("Error! First name field is required*.");
            return;
        }
        if (userRecord.email === '') {
            setFrontendErrorMsg("Error! Email field is required*.");
            return;
        }
        else {
            if (!validateEmail(userRecord.email)) {
                setFrontendErrorMsg("Error! Email is not valid.");
                return;
            }
        }

        if (userRecord.password === '') {
            setFrontendErrorMsg("Error! Password field is required*.");
            return;
        }
        else {
            if (!validatePWD(userRecord.password)) {
                setFrontendErrorMsg("Error! Password is not valid.");
                return;
            }
        }

        if (String(userRecord.acceptedConsent) !== 'true') {
            setFrontendErrorMsg("Error! Please agree with Privacy Policy before we proceed.");
        }
        else {
            if (quizTakenNow && !loggedIn) {
                setYourResultsState('CR');
                setSeeMachtingResultPage(true);
                setFrontendErrorMsg('');
                setReRender(true);
            }
        }       
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

    function renderConsent() {
        if (userRecord.acceptedConsent === true) {
            return (
                <label htmlFor="acceptedConsent">
                    <input onInput={fieldChanged} required type="checkbox" id="acceptedConsent" name="acceptedConsent" value="true" />&nbsp;
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

    // if BE route did not well, show why ...
    if (backendError) {
        errorMsgToShow = backendErrorMsg;
    }
    else {
        errorMsgToShow = frontendErrorMsg;
    }
    /* ... if a user - which is not logged in - wants to show matching results, but */
    /* ... initiated a new quiz without finishing it yet ... restart the quiz ... */
    if (seeQuestionairePage) {
        return (
            <Redirect to={{ pathname: props.cfgData.FE_ROUTE_QUESTIONAIRE_START }} />
        );
    }
    else if (seeMachtingResultPage && backendDone) {
        /* ... user actions & getting matching results done successfully -> show up matching results - page */        
        /* ... set localStorage - quizTaken -> true ... */
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
