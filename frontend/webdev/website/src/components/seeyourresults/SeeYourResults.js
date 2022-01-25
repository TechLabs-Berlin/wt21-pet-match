import React, { useEffect, useState } from 'react';
import axios from 'axios';
import seeYourResultsCSS from './SeeYourResults.css';

const SeeYourResults = (props) => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [acceptedConsent, setAcceptedConsent] = useState('');
    const [answerArr, setAnswerArr] = useState({});
    const [resultArr, setResultArr] = useState({});
    const [firstRendered, setFirstRenderd] = useState(false);

    let loggedIn = window.sessionStorage.getItem("loggedIn");
    let quizTakenNow = props.quizTaken;
    let chosenAnswer = JSON.parse(sessionStorage.getItem("chosenAnswer"));
    //chosenAnswer[0].answerID = 0;
    //chosenAnswer[0].userID = 0;

    console.log("... begin: SeeYourResults ...");

    useEffect(() => {
        setAnswerArr(chosenAnswer[0]);
        setFirstRenderd(true);
        console.log("... begin: useEffect ... ");
        console.log(chosenAnswer[0]);
        console.log(answerArr);
        axios.post('http://localhost:3001/viewresult',chosenAnswer[0])
            .then (res => {
                if (parseInt(res.status) === 200) {
                    console.log(res.data);
                    return res.data;
                } 
                else {
                    console.log("res ist NICHT ok");
                }
            }).then(jsonRes => {
                console.log(jsonRes);
                setFirstname('Max');
                setLastname('Mustermann');
                setEmail('max.mustermann@somwhere.com');
                setPassword('IchBinEinAusgdachtesPWD');
                setAcceptedConsent(false);
                setResultArr(jsonRes);
            })
            .catch(error => console.log(error)); 
        console.log(resultArr);
        console.log("... end: useEffect ... ");
    }, []);

    console.log("... end: SeeYourResults ...");

    return (
        <main className="questionnaire">
            <div className="container__top_questionnaire">
                <div className="container__youre_done">
                    <h1 className="questionnaire_done">You're done!</h1>
                </div>
                <div className="container__button_results">
                    <button className="button__results">{props.cfgData.FE_ROUTE_SEEYOURRESULTS_MENUITEM}</button>
                </div>
            </div>
            <div className="container__bottom_questionnaire">
                <div className="container__signup_option">
                    <p>or</p>
                    <h2>Sign up to save your results</h2>
                </div>
                <form action="" method="post" className="form__signup" id="signup_results_page">
                    <input type="text" name="USER_firstname" id="user_firstname" placeholder="Your first name" required />
                    <input type="text" name="USER_lastname" id="user_lastname" placeholder="Your last name" required />
                    <input type="email" name="user_email" id="user_email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" placeholder="Your email" required />
                    <input type="password" name="user_password" id="user_password"
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters."
                        placeholder="Choose a password" required />
                    <label htmlFor="user_acceptedConsent">
                        <input required type="checkbox" id="user_acceptedConsent" name="user_acceptedConsent" />&nbsp;
                        I inderstand that my personal data will be processed in accordance with Pet Match's <a href="/privacy">Privacy Policy</a>
                    </label>
                </form>
                <div className="container__button_signup_submit">
                    <button type="submit" form="signup_results_page" className="button__signup_submit">Create Account</button>
                </div>
                <div className="container__login">
                    <p>Already have an account? <a href="/login">Log in</a></p>
                </div>
            </div>
        </main>
    )
};

export default SeeYourResults;
