import React from 'react';
import { Link } from 'react-router-dom';
import homeCSS from './Home.css';

const Home = (props) => {
    return (
        <main className="homepage">
            <div className="banner__homepage">
                <div className="h1__homepage">
                    <h1>{props.cfgData.HOME_H1_TXT}</h1>
                    <button className="button__take_quiz">
                        <Link to={props.cfgData.FE_ROUTE_QUESTIONAIRE_START}>{props.cfgData.HOME_TTQ_TXT}</Link>
                    </button>
                </div>
            </div>
        </main>
    );
};

export default Home;