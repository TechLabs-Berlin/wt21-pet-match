import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <main class="homepage">
            <div class="banner__homepage">
                <div class="h1__homepage">
                    <h1>Find the right cat for you.</h1>
                    <h3 class="cta__homepage">
                        <Link to="/questionaire/start">Take the quiz &#11106;</Link>
                    </h3>
                </div>
            </div>
        </main>
    );
};

export default Home;