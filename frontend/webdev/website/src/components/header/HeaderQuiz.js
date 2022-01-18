import React from 'react';
import { Link } from 'react-router-dom';

const HeaderQuiz = (props) => {
    if (props.quizTaken) {
        return (
            <Link to={props.cfgData.FE_ROUTE_QUESTIONAIRE_START}>{props.cfgData.FE_ROUTE_QUESTIONAIRE_RETAKE_MENUITEM}</Link>
        );
    }
    else {
        return (
            <Link to={props.cfgData.FE_ROUTE_QUESTIONAIRE_START}>{props.cfgData.FE_ROUTE_QUESTIONAIRE_START_MENUITEM}</Link>
        );
    };
};

export default HeaderQuiz;