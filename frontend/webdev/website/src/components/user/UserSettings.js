import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import userSettingsCSS from './UserSettings.css';

const UserSettings = (props) => {
    const userId = sessionStorage.getItem("userId");
    const loggedIn = sessionStorage.getItem("loggedIn");
    const uSUHImg = props.cfgData.LAYOUT_IMAGES_PATH + props.cfgData.USER_SETTINGS_UH_IMG;
    const uSUHImg_ALT = props.cfgData.USER_SETTINGS_UH_IMG_ALT;
    const uSUSImg = props.cfgData.LAYOUT_IMAGES_PATH + props.cfgData.USER_SETTINGS_US_IMG;
    const uSUSImg_ALT = props.cfgData.USER_SETTINGS_US_IMG_ALT;
    const uSUH_TXT_01 = props.cfgData.USER_SETTINGS_UH_TXT_01;
    const uSUH_TXT_02 = props.cfgData.USER_SETTINGS_UH_TXT_02;
    const uSUS_TXT_01 = props.cfgData.USER_SETTINGS_US_TXT_01;
    const uSUS_TXT_02 = props.cfgData.USER_SETTINGS_US_TXT_02;

    
    return (
        <main className="homepage">
            <div className="img_hero_cover">
                <div class="h1__homepage">
                    <h1>{props.cfgData.USER_SETTINGS_HEADERTXT_01}</h1>
                    <button className="button__retake_quiz">{props.cfgData.USER_SETTINGS_HEADERTXT_02}</button>
                </div>
            </div>
            <div className="container__homepage_bottom">
                <div className="container__user_home">
                    <div className="container__user_options">
                        <div className="container__icon_user">
                            <img src={uSUHImg} alt={uSUHImg_ALT} />
                        </div>
                        <div className="container__text_user">
                            <h2>{uSUH_TXT_01}</h2>
                            <h3>{uSUH_TXT_02}</h3>
                        </div>
                        <a href="matching-result.html"><span></span></a>
                    </div>
                    <div className="container__user_options">
                        <div className="container__icon_user">
                            <img src={uSUSImg} alt={uSUSImg_ALT} />
                        </div>
                        <div className="container__text_user">
                            <h2>{uSUS_TXT_01}</h2>
                            <h3>{uSUS_TXT_02}</h3>
                            <a href="settings.html"><span></span></a>
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