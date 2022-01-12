import React from 'react';
import { Link } from 'react-router-dom';
import homeCSS from './Home.css';

const Home = () => {
    return (
        <main className="homepage">
            <div className="banner__homepage">
                <div className="h1__homepage">
                    <h1>Find the right cat for you.</h1>
                    <h3 className="cta__homepage">
                        <Link to="/questionaire/start">Take the quiz &#11106;</Link>
                    </h3>
                </div>
            </div>
        </main>
    );
};

export default Home;