import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import Home from './Home';
import QuestionaireStart from './questionaire/QuestionaireStart';
import MatchingResults from './matching/MatchingResults';
import CatDetails from './cat/CatDetails';
import Header from './Header';
import Footer from './Footer';
import HowItWorks from './HowItWorks';
import AboutUs from './AboutUs';
import ShelterArea from './ShelterArea';
import LogIn from './LogIn';
import Imprint from './Imprint';

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <div>
                    <Header />
                    <Route path="/" exact component={Home} />
                    <Route path="/howitworks" component={HowItWorks} />
                    <Route path="/aboutus" component={AboutUs} />
                    <Route path="/shelterarea" component={ShelterArea} />
                    <Route path="/login" component={LogIn} />
                    <Route path="/imprint" component={Imprint} />
                    <Route path="/questionaire/start" component={QuestionaireStart} />
                    <Route path="/matching/results" component={MatchingResults} />
                    <Route path="/cat/details" component={CatDetails} />
                    <Footer />
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;