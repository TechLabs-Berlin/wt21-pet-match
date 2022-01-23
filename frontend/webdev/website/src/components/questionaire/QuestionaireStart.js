import React, { useEffect, useState } from 'react';
import RenderFormField from './RenderFormField';
import axios from 'axios';
import questionaireCSS from './Questionaire.css';

const QuestionaireStart = (props) => {
    const [questionaireArr, setQuestionaireArr] = useState([]);
    const [questionairePage, setQuestionairePage] = useState(1);
    const [answerArr, setAnswerArr] = useState([]);
    const [firstRendered, setFirstRenderd] = useState(false);
    const [reRender, setReRender] = useState(false);

    let choosenAnswer = [{ "answerID": 0, "userID": 0, "allchoosenAnswer": [] }];
    let qIndex = 0, maxPage = 0, actualPage = {}, actualAnswers = [];
    let questionText = '', questionType = 0, questionActValue = 0;
    let sessionArr = [];

    //console.log("... begin: QuestionaireStart ...");
    //console.log(localStorage);
    //console.log(sessionStorage);

    useEffect(() => {
        setFirstRenderd(true);
        sessionStorage.setItem("choosenAnswer",answerArr);
        fetch("/matchquiz")
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            }).then(jsonRes => setQuestionaireArr(jsonRes))
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        //console.log("... start: useEffect: qP + aA ...");
        if (firstRendered) {
            //console.log("... fristRendered TRUE ...");
            //console.log(choosenAnswer);
            //sessionArr = window.sessionStorage.getItem("choosenAnswer");
            //console.log(sessionArr);
            setAnswerArr(choosenAnswer);
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
        setQuestionairePage(newQPage);
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
        choosenAnswer = answerArr;
        choosenAnswer[0].allchoosenAnswer[pageToChangeValue].choosenAnswer = parseInt(fieldValue);
        //console.log(choosenAnswer);
        window.sessionStorage.setItem("choosenAnswer", JSON.stringify(choosenAnswer));
        //sessionArr = JSON.parse(window.sessionStorage.getItem("choosenAnswer"));
        setAnswerArr(choosenAnswer);
        setReRender(true);
        //console.log(answerArr);
        //console.log(sessionArr);
        //console.log("... end: fieldChanged ...");
    };


    function renderPreviousButton(actualPage,maxPage,actualValue,questionType) {
        if ((actualPage === 1)) {
            return (<button disabled className="button__questionnaire_back">&#60; Back</button>)
        }
        else {
            return (<button onClick={onClickPrevPage} className="button__questionnaire_back">&#60; Back</button>)
        }       
    }

    function renderNextButton(actualPage,maxPage,actualValue,questionType) {
        if ((actualPage === maxPage) || (actualValue === 0 && questionType !== 1)) {
            return (<button disabled className="button__questionnaire_next">Next</button>)            
        }
        else {
            return (<button onClick={onClickNextPage} className="button__questionnaire_next">Next</button>)            
        }
    }

    function renderQuestion(pAnswers,pMaxPage,pActValue,pType) {
        if (pMaxPage < 1) {
            return ('');
        }

        return (
            <div className="container__bottom_questionnaire">
                {pAnswers.map((answer,index) => (
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
            choosenAnswer = answerArr;
        }
        else {
            choosenAnswer[0].answerID = sessionStorage.getItem("answerId"); 
            choosenAnswer[0].userID = sessionStorage.getItem("userId");

            if (questionaireArr.length > 0) {
                questionaireArr.map((question, index) => {
                    choosenAnswer[0].allchoosenAnswer.push({ questionID: question.questionID, choosenAnswer: 0 });
                });
                setAnswerArr(choosenAnswer);                
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
        //console.log(choosenAnswer);
        //console.log(sessionStorage.choosenAnswer);
        questionActValue = parseInt(choosenAnswer[0].allchoosenAnswer[qIndex].choosenAnswer);
        questionText = actualPage.questionText;
        questionType = actualPage.questionType;
        actualAnswers = actualPage.answer;
    }
    //console.log("... end: QuestionaireStart ...");

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
};

export default QuestionaireStart;