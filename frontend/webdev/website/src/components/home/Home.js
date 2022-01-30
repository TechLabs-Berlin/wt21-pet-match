import React from 'react';
import { Link } from 'react-router-dom';
import homeCSS from './Home.css';

const Home = (props) => {
    return (
        <main className="homepage">
            <div className="banner__homepage">
                <div className="h1__homepage">
                    <h1>Get matched with the right cat</h1>
                    <h3 className="cta__homepage">
                        <Link to={props.cfgData.FE_ROUTE_QUESTIONAIRE_START}>{props.cfgData.HOME_TTQ_TXT}&#11106;</Link>
                    </h3>
                </div>
            </div>
        </main>
    );
};

export default Home;