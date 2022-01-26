import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RenderCatCard from './RenderCatCard';
//import matchingResultCSS from './MatchingResult.css';

const MatchingResult = (props) => {
    const [resultArr, setResultArr] = useState();

    const location = useLocation();
    let resultArrToPass = location.state.resultArr.resultArr;

    console.log("... begin: MatchingResult ...");
    console.log(resultArrToPass);

    useEffect(() => {
        setResultArr(resultArrToPass);
    }, []);

    console.log("... end: MatchingResult ...");
    return (
        <main className="matching_results">
            <div className="container__filters">
                <div className="filter">
                    <p>Sterilized</p>
                    <label htmlFor="sterilized_yes">
                        <input type="checkbox" name="sterilized" id="sterilized_yes" value="yes" />
                        Yes
                    </label>
                    <label htmlFor="sterilized_no">
                        <input type="checkbox" name="sterilized" id="sterilized_no" value="no" />
                        No
                    </label>
                </div>
                <div className="filter">
                    <p>Gender</p>
                    <label htmlFor="gender_female">
                        <input type="checkbox" name="gender" id="gender_female" value="female" />
                        Female
                    </label>
                    <label htmlFor="gender_male">
                        <input type="checkbox" name="gender" id="gender_male" value="male" />
                        Male
                    </label>
                </div>
                <div className="filter">
                    <p>Good with</p>
                    <label htmlFor="good_with_kids">
                        <input type="checkbox" name="good_with" id="good_with_kids" value="kids" />
                        Kids
                    </label>
                    <label htmlFor="good_with_experience_tutor">
                        <input type="checkbox" name="good_with" id="good_with_experience_tutor" value="experienced_tutor" />
                        Experienced Tutor
                    </label>
                    <label htmlFor="good_with_other_cats">
                        <input type="checkbox" name="good_with" id="good_with_other_cats" value="other_cats" />
                        Other cats
                    </label>
                </div>
            </div>
            <div className="container__results">
                <div className="container__title">
                    <h1>Your Matches</h1>
                </div>
                <div className="container__cat_cards">
                    {resultArrToPass.Result.map((catData, index) => (
                        <RenderCatCard
                            key={index}
                            index={index}
                            resultArr={resultArrToPass}
                            catToShow={catData}  
                            imgPath={props.cfgData.CAT_IMAGES_PATH}
                            catProfilePage={props.cfgData.FE_ROUTE_CAT_DETAIL}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
};

export default MatchingResult;