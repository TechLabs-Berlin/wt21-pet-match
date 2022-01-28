import React, { useEffect, useState } from 'react';
import { Redirect } from "react-router";
import RenderFormField from './RenderFormField';
import questionaireCSS from './Questionaire.css';

const QuestionaireStart = (props) => {
    const [questionaireArr, setQuestionaireArr] = useState([]);
    const [questionairePage, setQuestionairePage] = useState(1);
    const [answerArr, setAnswerArr] = useState([]);
    const [firstRendered, setFirstRenderd] = useState(false);
    const [reRender, setReRender] = useState(false);
    const [seeYourResultsPage, setSeeYourResultsPage] = useState(false);

    let chosenAnswer = [{ "answerID": 0, "userID": 0, "allChosenAnswer": [] }];
    let qIndex = 0, maxPage = 0, actualPage = {}, actualAnswers = [];
    let questionText = '', questionType = 0, questionActValue = 0;

    //console.log("... begin: QuestionaireStart ...");
    //console.log(sessionStorage);

    useEffect(() => {
        setFirstRenderd(true);
        sessionStorage.setItem("chosenAnswer", answerArr);
        fetch("/matchquiz")
            .then(res => {
                //console.log(res);
                if (res.ok) {
                    //console.log("res ist ok");
                    return res.json();
                }
            }).then(jsonRes => {
                console.log(" ... QuestionaireStart, useEffect, fetch matchquiz, then, then, jsonRes ...");
                console.log(jsonRes);
                setQuestionaireArr(jsonRes);
            })
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        //console.log("... start: useEffect: qP + aA ...");
        if (firstRendered) {
            //console.log("... fristRendered TRUE ...");
            //console.log(chosenAnswer);
            //sessionArr = window.sessionStorage.getItem("chosenAnswer");
            //console.log(sessionArr);
            setAnswerArr(chosenAnswer);
            setReRender(false);
        }
        //console.log("... end: useEffect: qP + aA ...");
    }, [reRender, questionairePage, answerArr]);

    const onClickNextPage = e => {
        e.preventDefault();
        let newQPage = questionairePage + 1;
        //console.log("... onClickNextPage ...");
        //console.log(questionairePage);
        //console.log(newQPage);
        if (questionairePage === questionaireArr.length) {
            setSeeYourResultsPage(true);
        }
        else {
            setQuestionairePage(newQPage);
        }
        setReRender(true);
        //console.log(questionairePage);
    };

    const onClickPrevPage = e => {
        e.preventDefault();
        let newQPage = questionairePage - 1;
        //console.log("... onClickPrevPage ...");
        //console.log(questionairePage);
        //console.log(newQPage);
        setQuestionairePage(newQPage);
        setReRender(true);
        //console.log(questionairePage);        
    };

    const fieldChanged = (fieldValue) => {
        let pageToChangeValue = questionairePage - 1;
        //console.log("... start: fieldChanged ...");
        //console.log(fieldValue);
        chosenAnswer = answerArr;
        chosenAnswer[0].allChosenAnswer[pageToChangeValue].chosenAnswer = parseInt(fieldValue);
        //console.log(chosenAnswer);
        window.sessionStorage.setItem("chosenAnswer", JSON.stringify(chosenAnswer));
        //sessionArr = JSON.parse(window.sessionStorage.getItem("chosenAnswer"));
        setAnswerArr(chosenAnswer);
        setReRender(true);
        //console.log(answerArr);
        //console.log(sessionArr);
        //console.log("... end: fieldChanged ...");
    };


    function renderPreviousButton(actualPage, maxPage, actualValue, questionType) {
        let pageTxt = props.cfgData.Q_QUESTIONAIRE_BTN_PTXT;
        if ((actualPage === 1)) {
            return (<button disabled className="button__questionnaire_back">&#60; {pageTxt}</button>)
        }
        else {
            return (<button onClick={onClickPrevPage} className="button__questionnaire_back">&#60; {pageTxt}</button>)
        }
    }

    function renderNextButton(actualPage, maxPage, actualValue, questionType) {
        let pageTxt = props.cfgData.Q_QUESTIONAIRE_BTN_NTXT;
        if (actualPage === maxPage) {
            pageTxt = props.cfgData.Q_QUESTIONAIRE_BTN_FTXT;
        }
        if ((actualValue === 0 && questionType !== 1)) {
            return (<button disabled className="button__questionnaire_next">{pageTxt}</button>)
        }
        else {
            return (<button onClick={onClickNextPage} className="button__questionnaire_next">{pageTxt}</button>)
        }
    }

    function renderQuestion(pAnswers, pMaxPage, pActValue, pType) {
        if (pMaxPage < 1) {
            return ('');
        }

        return (
            <div className="container__bottom_questionnaire">
                {pAnswers.map((answer, index) => (
                    <RenderFormField
                        key={index} f
                        fieldChanged={fieldChanged}
                        actValue={pActValue}
                        answer={answer}
                        index={index}
                        qType={pType}
                    />
                ))}
            </div>
        )
    }

    function initializeAnswerArr() {
        /* if questions already loaded ... */
        if (answerArr.length > 0) {
            if (answerArr[0].userID === 0) {
                answerArr[0].userID = sessionStorage.getItem("userId");
            }
            if (answerArr[0].answerID === 0) {
                answerArr[0].answerID = sessionStorage.getItem("answerId");
            }
            chosenAnswer = answerArr;
        }
        else {
            chosenAnswer[0].answerID = sessionStorage.getItem("answerId");
            chosenAnswer[0].userID = sessionStorage.getItem("userId");

            if (questionaireArr.length > 0) {
                questionaireArr.map((question, index) => {
                    chosenAnswer[0].allChosenAnswer.push({ questionID: question.questionID, chosenAnswer: 0 });
                });
                setAnswerArr(chosenAnswer);
            }
        }
    }

    /* Do all this stuff, if useEffect has been executed and state-variables contain data fetched from DB */
    if (firstRendered && questionaireArr.length > 0) {
        /* Control page navigation and page content to show */
        qIndex = questionairePage - 1;
        maxPage = questionaireArr.length;
        actualPage = questionaireArr[qIndex];
        initializeAnswerArr();
        //console.log(questionaireArr);
        //console.log(sessionStorage.chosenAnswer);
        questionActValue = parseInt(chosenAnswer[0].allChosenAnswer[qIndex].chosenAnswer);
        questionText = actualPage.questionText;
        questionType = actualPage.questionType;
        actualAnswers = actualPage.answer;
    }
    
    //console.log("... end: QuestionaireStart ...");

    /* last question answered -> show up seeYourResults - page */
    if (questionairePage === maxPage && seeYourResultsPage) {
        return (
            <Redirect to={props.cfgData.FE_ROUTE_SEEYOURRESULTS} />
        );
    }
    else {
        return (
            <main className="questionnaire">
                <form>
                    <div className="container__top_questionnaire">
                        <div className="question_count">
                            <p>{props.cfgData.Q_QUESTION_TXT} {questionairePage}/{maxPage}</p>
                        </div>
                        <div className="container__question">
                            <h1 className="questionnaire_question">{questionText}</h1>
                        </div>
                    </div>
                    {renderQuestion(actualAnswers,maxPage,questionActValue,questionType)}
                </form>
                <div className="container__back_next">
                    {renderPreviousButton(questionairePage,maxPage,questionActValue,questionType)}
                    {renderNextButton(questionairePage,maxPage,questionActValue,questionType)}                
                </div>
            </main>
        );
    }
};

export default QuestionaireStart;