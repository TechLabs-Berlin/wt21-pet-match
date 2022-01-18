import React from 'react';
import { Link } from 'react-router-dom';

const HeaderMatch = (props) => {
    if (props.quizTaken) {
        return (
            <li>
                <Link to={props.cfgData.FE_ROUTE_MATCHING_RESULT}>{props.cfgData.FE_ROUTE_MATCHING_RESULT_MENUITEM}</Link>
            </li>
        );
    }
    else {
        return (''); 
    };
};

export default HeaderMatch;