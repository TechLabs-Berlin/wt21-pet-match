/* Import react-components */
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
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
import AboutUs from './aboutus/AboutUs';
import Shelter from './shelter/Shelter';
import LogIn from './login/LogIn';
import Imprint from './imprint/Imprint';
import Privacy from './privacy/Privacy';              

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <Header cfgData={cfgData} />
                <Route path={cfgData.FE_ROUTE_HOME} exact><Home cfgData={cfgData} /></Route>
                <Route path={cfgData.FE_ROUTE_HOWITWORKS} exact><HowItWorks cfgData={cfgData} /></Route>
                <Route path={cfgData.FE_ROUTE_ABOUTUS} exact><AboutUs cfgData={cfgData} /></Route>
                <Route path={cfgData.FE_ROUTE_SHELTER} exact><Shelter cfgData={cfgData} /></Route>
                <Route path={cfgData.FE_ROUTE_LOGIN} exact><LogIn cfgData={cfgData} loginState='I' /></Route>
                <Route path={cfgData.FE_ROUTE_LOGOUT} exact><LogIn cfgData={cfgData} loginState='O' /></Route>
                <Route path={cfgData.FE_ROUTE_LOGIN_CREATE} exact><LogIn cfgData={cfgData} loginState='C' /></Route>
                <Route path={cfgData.FE_ROUTE_PRIVACY} exact><Privacy cfgData={cfgData} /></Route>
                <Route path={cfgData.FE_ROUTE_IMPRINT} exact><Imprint cfgData={cfgData} /></Route>
                <Route path={cfgData.FE_ROUTE_QUESTIONAIRE_START} exact><QuestionaireStart cfgData={cfgData} /></Route>
                <Route path={cfgData.FE_ROUTE_MATCHING_RESULT} exact><MatchingResult cfgData={cfgData} /></Route>
                <Route path={cfgData.FE_ROUTE_CAT_DETAIL} exact><CatDetail cfgData={cfgData} /></Route>
                <Footer cfgData={cfgData} />
            </div>
        </BrowserRouter>
    )
};

export default App;