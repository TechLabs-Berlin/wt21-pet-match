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

    useEffect(() => {
        setFirstRenderd(true);

        /* ... re-initialize some local storage as if new questionnaire begins ... */
        localStorage.setItem("chosenAnswer", answerArr);

        fetch("/matchquiz")
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                else {
                    console.log("QuestionaireStart: /matchquiz - not OK, state: "+res.status+", msg: "+res.statusText);
                }
            }).then(jRes => {
                setQuestionaireArr(jRes);
            })
            .catch(error => {
                console.log("QuestionaireStart: /matchquiz - catch, "+error);
            });
    }, []);

    useEffect(() => {
        if (firstRendered) {
            setAnswerArr(chosenAnswer);
            setReRender(false);
        }
    }, [reRender, questionairePage, answerArr]);

    const onClickNextPage = e => {
        e.preventDefault();
        let newQPage = questionairePage + 1;
        if (questionairePage === questionaireArr.length) {
            setSeeYourResultsPage(true);
        }
        else {
            setQuestionairePage(newQPage);
        }
        setReRender(true);
    };

    const onClickPrevPage = e => {
        e.preventDefault();
        let newQPage = questionairePage - 1;
        setQuestionairePage(newQPage);
        setReRender(true);       
    };

    const fieldChanged = (fieldValue) => {
        let pageToChangeValue = questionairePage - 1;
        chosenAnswer = answerArr;
        chosenAnswer[0].allChosenAnswer[pageToChangeValue].chosenAnswer = parseInt(fieldValue);
        localStorage.setItem("chosenAnswer", JSON.stringify(chosenAnswer));
        setAnswerArr(chosenAnswer);
        setReRender(true);
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
        if (pMaxPage >= 1) {
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
    }

    function initializeAnswerArr() {
        /* if questions already loaded from BE ... */
        if (answerArr.length > 0) {
            if (answerArr[0].userID === '' || answerArr[0].userID === 0) {
                answerArr[0].userID = localStorage.getItem("userID");
            }
            if (answerArr[0].answerID === '' || answerArr[0].answerID === 0) {
                answerArr[0].answerID = localStorage.getItem("answerId");
            }
            chosenAnswer = answerArr;
        }
        else {
            chosenAnswer[0].answerID = localStorage.getItem("answerId");
            chosenAnswer[0].userID = localStorage.getItem("userID");

            if (questionaireArr.length > 0) {
                questionaireArr.map((question, index) => {
                    chosenAnswer[0].allChosenAnswer.push({ questionID: question.questionID, chosenAnswer: 0 });
                });
                setAnswerArr(chosenAnswer);
            }
        }
    }

    /* ... do all this stuff, if useEffect has been executed for first time and state-variables contain data fetched from DB ... */
    if (firstRendered && questionaireArr.length > 0) {
        /* Control page navigation and page content to show */
        qIndex = questionairePage - 1;
        maxPage = questionaireArr.length;
        actualPage = questionaireArr[qIndex];
        
        /* initialize the array of given answers by the user */
        initializeAnswerArr();
        questionActValue = parseInt(chosenAnswer[0].allChosenAnswer[qIndex].chosenAnswer);
        questionText = actualPage.questionText;
        questionType = actualPage.questionType;
        actualAnswers = actualPage.answer;
    }

    /* ... last question has been answered -> show up seeYourResults - page ... */
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