import React from 'react';
import { Redirect } from "react-router";
import { Link, NavLink } from 'react-router-dom';
import userSettingsCSS from './UserSettings.css';

const UserSettings = (props) => {
    //const userID = localStorage.getItem("userID");
    //const firstName = localStorage.getItem("firstName");
    const loggedIn = localStorage.getItem("loggedIn");
    const quizTaken = localStorage.getItem("quizTaken");

    const uSUHImg = props.cfgData.LAYOUT_ICONS_PATH + props.cfgData.USER_SETTINGS_UH_IMG;
    const uSUHImg_ALT = props.cfgData.USER_SETTINGS_UH_IMG_ALT;
    const uSUSImg = props.cfgData.LAYOUT_ICONS_PATH + props.cfgData.USER_SETTINGS_US_IMG;
    const uSUSImg_ALT = props.cfgData.USER_SETTINGS_US_IMG_ALT;
    const uSUH_TXT_01 = props.cfgData.USER_SETTINGS_UH_TXT_01;
    const uSUH_TXT_02 = props.cfgData.USER_SETTINGS_UH_TXT_02;
    const uSUS_TXT_01 = props.cfgData.USER_SETTINGS_US_TXT_01;
    const uSUS_TXT_02 = props.cfgData.USER_SETTINGS_US_TXT_02;

    const retakeQuizClicked = e => {
        localStorage.setItem("yourResultsState","RT"); 
    };

    const matchQuizClicked = e => {
        localStorage.setItem("yourResultsState","YM");      
    };

    const onUserSettingsClicked = e => {
        e.preventDefault();
    };

    function renderRetakeQuizBTN(pQuizTaken) {
        if (String(pQuizTaken) === 'true') {
            return (
                <NavLink to={props.cfgData.FE_ROUTE_QUESTIONAIRE_START}>
                    <button onClick={retakeQuizClicked} className="button__retake_quiz">{props.cfgData.USER_SETTINGS_HEADERTXT_02}</button>
                </NavLink>
            );
        }
        else {
            return (
                <NavLink to={props.cfgData.FE_ROUTE_QUESTIONAIRE_START}>
                    <button onClick={matchQuizClicked} className="button__retake_quiz">{props.cfgData.FE_ROUTE_QUESTIONAIRE_START_MENUITEM}</button>
                </NavLink>

            );
        }
    }
    
    function renderShowMatchHistory(pQuizTaken) {
        if (String(pQuizTaken) === 'true') {
            return (
                <div className="container__user_options">
                    <div className="container__icon_user">
                        <img src={uSUHImg} alt={uSUHImg_ALT} />
                    </div>
                    <div className="container__text_user">
                        <h2>{uSUH_TXT_01}</h2>
                        <h3>{uSUH_TXT_02}</h3>
                    </div>
                    <NavLink to={props.cfgData.FE_ROUTE_SEEYOURRESULTS}>
                        <span></span>
                    </NavLink>
                </div>                
            );
        }
        else {
            return ('');
        }
    }

    if (String(loggedIn) === 'false') {
        return (
            <Redirect to={{ pathname: props.cfgData.FE_ROUTE_HOME }} />
        );
    }

    return (
        <main className="homepage">
            <div className="img_hero_cover">
                <div className="h1__homepage">
                    <h1>{props.cfgData.USER_SETTINGS_HEADERTXT_01}</h1>
                    {renderRetakeQuizBTN(quizTaken)}
                </div>
            </div>
            <div className="container__homepage_bottom">
                <div className="container__user_home">
                    {renderShowMatchHistory(quizTaken)}
                    <div className="container__user_options">
                        <div className="container__icon_user">
                            <img src={uSUSImg} alt={uSUSImg_ALT} />
                        </div>
                        <div className="container__text_user">
                            <h2>{uSUS_TXT_01}</h2>
                            <h3>{uSUS_TXT_02}</h3>
                            <Link onClick={onUserSettingsClicked} to={props.cfgData.FE_ROUTE_HOME}>
                                <span></span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="container__user_map">
                </div>
            </div>
        </main>
    );
};

export default UserSettings;