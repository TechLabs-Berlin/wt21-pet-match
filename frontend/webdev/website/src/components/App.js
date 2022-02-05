import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

/* import project configuration data */
import cfgData from '../config/cfgData.json';

/* import project main components */
import ScrollToTop from './ScrollToTop';
import Header from './header/Header';
import Footer from './footer/Footer';
import Home from './home/Home';
import HowItWorks from './howitworks/HowItWorks';
import Privacy from './privacy/Privacy'; 
import LogIn from './login/LogIn';
import UserSettings from './user/UserSettings';
import QuestionaireStart from './questionaire/QuestionaireStart';
import SeeYourResults from './seeyourresults/SeeYourResults';
import MatchingResult from './matching/MatchingResult';
import CatDetail from './cat/CatDetail';

/* definition of our main project structure */
const App = () => {
    return (
        <BrowserRouter>
            <Header cfgData={cfgData} />
            <ScrollToTop>
                <Switch>
                    <Route path={cfgData.FE_ROUTE_HOME} exact><Home cfgData={cfgData} /></Route>
                    <Route path={cfgData.FE_ROUTE_HOWITWORKS} exact><HowItWorks cfgData={cfgData} /></Route>
                    <Route path={cfgData.FE_ROUTE_PRIVACY} exact><Privacy cfgData={cfgData} /></Route>
                    <Route path={cfgData.FE_ROUTE_LOGIN_CREATE} exact><LogIn cfgData={cfgData} loginState='C' /></Route>
                    <Route path={cfgData.FE_ROUTE_LOGIN} exact><LogIn cfgData={cfgData} loginState='I' /></Route>
                    <Route path={cfgData.FE_ROUTE_LOGOUT} exact><LogIn cfgData={cfgData} loginState='O' /></Route>
                    <Route path={cfgData.FE_ROUTE_USER_SETTINGS} exact><UserSettings cfgData={cfgData} /></Route>
                    <Route path={cfgData.FE_ROUTE_QUESTIONAIRE_START} exact><QuestionaireStart cfgData={cfgData} /></Route>
                    <Route path={cfgData.FE_ROUTE_SEEYOURRESULTS} exact><SeeYourResults cfgData={cfgData} quizTaken={true} yourResultsState='YM' /></Route>
                    <Route path={cfgData.FE_ROUTE_MATCHING_RESULT} exact><MatchingResult cfgData={cfgData} /></Route>
                    <Route path={cfgData.FE_ROUTE_CAT_DETAIL} exact><CatDetail cfgData={cfgData} /></Route>
                </Switch>
            </ScrollToTop>
            <Footer cfgData={cfgData} />
        </BrowserRouter>
    )
};

export default App;