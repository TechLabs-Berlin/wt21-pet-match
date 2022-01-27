import React from 'react';
import { NavLink } from 'react-router-dom';

const HeaderMatch = (props) => {
    if (props.quizTaken) {
        return (
            <li>
                <NavLink to={props.cfgData.FE_ROUTE_MATCHING_RESULT}>{props.cfgData.FE_ROUTE_MATCHING_RESULT_MENUITEM}</NavLink>
            </li>
        );
    }
    else {
        return (''); 
    };
};

export default HeaderMatch;