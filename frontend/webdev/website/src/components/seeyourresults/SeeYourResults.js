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
    const [loggedIn, setLoggedIn] = useState(false);
    const [answerArr, setAnswerArr] = useState({});
    const [resultArr, setResultArr] = useState({});
    const [yourResultsState, setYourResultsState] = useState('');
    const [seeMachtingResultPage, setSeeMachtingResultPage] = useState(false);
    const [reRender, setReRender] = useState(false);
    const [backendDone, setBackendDone] = useState(false);    
    const [backendError, setBackendError] = useState(false);
    const [backendErrorMsg, setBackendErrorMsg] = useState('');
    
    let chosenAnswer = [], errorMsgToShow = '';
    let userFromDB = { userID: 0, quizTaken: false, firstname: '', lastname: '', email: '', password: '', memberAccount: false, acceptedConsent: false };
    let tmpArr2, tmpArr2Txt, tmpArr;
    console.log("... begin: SeeYourResults ...");
    
    useEffect(() => {
        console.log("... begin: SeeYourResults, useEffect, [] ... ");
        if (sessionStorage.getItem("loggedIn") === true) {
            setLoggedIn(sessionStorage.getItem("loggedIn"));
        }
        console.log("xxxxxxx");
        tmpArr2 = sessionStorage.getItem("chosenAnswer");
        tmpArr2Txt = typeof (tmpArr2);
        console.log(tmpArr2Txt);
        console.log(tmpArr2.length);
        if (typeof(tmpArr2) === undefined) {
            console.log("NULL");
        }
        else {
            console.log("NOT NULL");
        }
        console.log("aaa"+tmpArr2+"bbb");
        console.log("yyyyyyy");
        if (sessionStorage.getItem("chosenAnswer") !== null && sessionStorage.getItem("chosenAnswer").length !== 0) {
            console.log("... SeeYourResults, sessionStorage, before json parse ...");
            chosenAnswer = JSON.parse(sessionStorage.getItem("chosenAnswer"));
            console.log(chosenAnswer);
            setAnswerArr(chosenAnswer[0]);
        }
        console.log("... end: SeeYourResults useEffect, [] ... ");
    }, []);

    useEffect(() => {
        console.log("... begin: SeeYourResults, useEffect, [reRender] ... ");
        if ((yourResultsState !== '') && !(backendDone) && (reRender)) {
            console.log("... SeeYourResults, useEffect, yourResultsState set and backend not done and should be re-rendered ... ");
            //console.log(chosenAnswer[0]);
            console.log(answerArr);
//            if (yourResultsState === 'VR') {
//                console.log("... SeeYourResults, useEffect, yourResultsState = /viewresult ... ");
//                axios.post('http://localhost:3001/viewresult', answerArr)
            let tmpState = 'YM';
            if (tmpState === 'YM') {
 //           if (yourResultsState === 'YM') {
                console.log("... SeeYourResults, useEffect, yourResultsState = /yourmatchesresult ... ");
                tmpArr = { "userID": "61ef45acd9dc72a2678fbb46" };
                console.log("==== BEFORE AXIOS =====");
                console.log(tmpArr);
                axios.post('http://localhost:3001/yourmatchesresult', tmpArr)
                    .then (res => {
                        if (parseInt(res.status) === 200) {
                            console.log(" ... SeeYourResult, useEffect, axios.post, then, if status = 200 ...");
                            console.log(res.data);
                            return res.data;
                        } 
                        else {
                            console.log(" ... SeeYourResult, useEffect, axios.post, then, if status !== 200 ...");
                        }
                    }).then(jsonRes => {
                        console.log(" ... SeeYourResult, useEffect, axios.post, then, then, jsonRes ...");
                        console.log(jsonRes);
                        setResultArr(jsonRes);
                        userFromDB.userID = jsonRes.userID;
                        userFromDB.quizTaken = jsonRes.quizTaken;
                        setUserRecord(userFromDB);
                        setBackendDone(true);
                    })
                    .catch(error => {
                        console.log(" ... SeeYourResult, useEffect, axios.post, catch ...");
                        console.log(error);
                        setBackendError(true);
                        setBackendErrorMsg(error);
                        setBackendDone(false);
                    }); 
                console.log("==== AFTER AXIOS =====");
                console.log(" ... SeeYourResult, useEffect, after axios.post /viewresult ...");
                console.log(resultArr);
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

        if (quizTakenNow && !loggedIn) {
            console.log('... onClickCreate, if condition OK ...');
            setYourResultsState('CR');
            setSeeMachtingResultPage(true);
            setReRender(true);
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

    console.log("... end: SeeYourResults ...");

    /* user actions & getting matching results done successfully -> show up matching results - page */
    if (seeMachtingResultPage && backendDone) {
        console.log("... SeeYourResults, before Redirect (1) ...");
        console.log(resultArr);
        console.log("... SeeYourResults, before Redirect (2) ...");
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
                <div><h2>&nbsp;</h2></div>
                <div className="container__bottom_see_your_results">
                    <div><h2>&nbsp;</h2></div>
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
                            I inderstand that my personal data will be processed in accordance with Pet Match's <a href="/privacy">Privacy Policy</a>
                        </label>
                    </form>
                    <div className="container__button_signup_submit">
                        <button type="submit" onClick={onClickCreate} form="signup_results_page" className="button__signup_submit">Create Account</button>
                    </div>
                </div>
                <div className="errormsg">{errorMsgToShow}&nbsp;</div>
            </main>
        );    
    }
};

export default SeeYourResults;
