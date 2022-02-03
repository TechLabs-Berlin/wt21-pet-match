import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
/* Import project-configuration */
import cfgData from '../config/cfgData.json';
/* Import project-components */
import Header from './header/Header';
import Footer from './footer/Footer';
import Home from './home/Home';
import QuestionaireStart from './questionaire/QuestionaireStart';
import MatchingResult from './matching/MatchingResult';
import CatDetail from './cat/CatDetail';
import HowItWorks from './howitworks/HowItWorks';
import LogIn from './login/LogIn';
import UserSettings from './user/UserSettings';
import Privacy from './privacy/Privacy'; 
import SeeYourResults from './seeyourresults/SeeYourResults';   
import ScrollToTop from './ScrollToTop';        

const App = () => {
    return (
        <BrowserRouter>
            <Header cfgData={cfgData} />
            <ScrollToTop>
                <Switch>
                    <Route path={cfgData.FE_ROUTE_HOME} exact><Home cfgData={cfgData} /></Route>
                    <Route path={cfgData.FE_ROUTE_HOWITWORKS} exact><HowItWorks cfgData={cfgData} /></Route>
                    <Route path={cfgData.FE_ROUTE_LOGIN_CREATE} exact><LogIn cfgData={cfgData} loginState='C' /></Route>
                    <Route path={cfgData.FE_ROUTE_LOGIN} exact><LogIn cfgData={cfgData} loginState='I' /></Route>
                    <Route path={cfgData.FE_ROUTE_LOGOUT} exact><LogIn cfgData={cfgData} loginState='O' /></Route>
                    <Route path={cfgData.FE_ROUTE_USER_SETTINGS} exact><UserSettings cfgData={cfgData} /></Route>
                    <Route path={cfgData.FE_ROUTE_SEEYOURRESULTS} exact><SeeYourResults cfgData={cfgData} quizTaken={true} yourResultsState='YM' loginState='' /></Route>
                    <Route path={cfgData.FE_ROUTE_PRIVACY} exact><Privacy cfgData={cfgData} /></Route>
                    <Route path={cfgData.FE_ROUTE_QUESTIONAIRE_START} exact><QuestionaireStart cfgData={cfgData} /></Route>
                    <Route path={cfgData.FE_ROUTE_MATCHING_RESULT} exact><MatchingResult cfgData={cfgData} /></Route>
                    <Route path={cfgData.FE_ROUTE_CAT_DETAIL} exact><CatDetail cfgData={cfgData} /></Route>
                </Switch>
            </ScrollToTop>
            <Footer cfgData={cfgData} />
        </BrowserRouter>
    )
};
export default App;