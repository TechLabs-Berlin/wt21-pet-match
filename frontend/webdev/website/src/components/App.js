import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
import Home from './home/Home';
import QuestionaireStart from './questionaire/QuestionaireStart';
import MatchingResult from './matching/MatchingResult';
import CatDetail from './cat/CatDetail';
import HowItWorks from './howitworks/HowItWorks';
import AboutUs from './aboutus/AboutUs';
import Shelter from './shelter/Shelter';
import LogIn from './login/LogIn';
import Imprint from './imprint/Imprint';

import configData from '../config/configData.json';
const imagesPath = configData.IMAGES_PATH;

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <Header imagesPath={imagesPath}/>
                <Route path="/" exact component={Home} />
                <Route path="/howitworks" component={HowItWorks} />
                <Route path="/aboutus" component={AboutUs} />
                <Route path="/shelter" component={Shelter} />
                <Route path="/login" component={LogIn} />
                <Route path="/imprint" component={Imprint} />
                <Route path="/questionaire/start" component={QuestionaireStart} />
                <Route path="/matching/result" component={MatchingResult} />
                <Route path="/cat/detail" component={CatDetail} />
                <Footer />
            </div>
        </BrowserRouter>
    );
};

export default App;