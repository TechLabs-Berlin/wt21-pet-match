import React from 'react';
import { NavLink } from 'react-router-dom';

const HeaderQuiz = (props) => {
    if (props.quizTaken) {
        return (
            <NavLink to={props.cfgData.FE_ROUTE_QUESTIONAIRE_START}>{props.cfgData.FE_ROUTE_QUESTIONAIRE_START_MENUITEM}</NavLink>
            //<NavLink to={props.cfgData.FE_ROUTE_SEEYOURRESULTS}>{props.cfgData.FE_ROUTE_MATCHING_RESULT_MENUITEM}</NavLink>
        );
    }
    else {
        return (
            <NavLink to={props.cfgData.FE_ROUTE_QUESTIONAIRE_START}>{props.cfgData.FE_ROUTE_QUESTIONAIRE_START_MENUITEM}</NavLink>
        );
    };
};

export default HeaderQuiz;