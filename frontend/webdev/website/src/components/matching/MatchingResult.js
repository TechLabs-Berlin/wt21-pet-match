import React, { useEffect, useState } from 'react';
import { NavLink,useLocation } from 'react-router-dom';
import RenderCatCard from './RenderCatCard';
import matchingResultCSS from './MatchingResult.css';

const MatchingResult = (props) => {
    const [filterRecord, setFilterRecord] = useState({
        neutered: null,
        goodwith: '',
        gender: '',
    });
    const [resultArr, setResultArr] = useState();
    const [reRender, setReRender] = useState(false);

    const location = useLocation();
    let resultArrToPass = location.state.resultArr.resultArr;
    let filterRecToPass = { neutered: null, goodwith: '', gender: '' }
    console.log(location);
    if (location.state.filterRecord !== undefined) {
        filterRecToPass = location.state.filterRecord;
    }

    console.log("... begin: MatchingResult ...");
    console.log(resultArrToPass);

    useEffect(() => {
        setResultArr(resultArrToPass);
        setFilterRecord(filterRecToPass);
    }, []);

    useEffect(() => {
        console.log("... begin: SeeYourResults, useEffect, [userRecord] ... ");
        console.log("... end: SeeYourResults useEffect, [userRecord] ... ");
    }, [filterRecord]); 

    const fieldChanged = e => {
        const { name, value } = e.target;
        /* if input-field changed, save new value in state variable userRecord */
        setFilterRecord(prevRecord => {
            return {
                ...prevRecord,
                [name]: value
            }
        });
    };

    const retakeQuizClicked = e => {
        localStorage.setItem("yourResultsState","RT");      
    };

    function renderRadioInput(pName, pId, pRValue, pActValue) {
        if (String(pRValue) === String(pActValue)) {
            return (
                <input checked onChange={fieldChanged} type="radio" name={pName} id={pId} value={pRValue} />
            );
        }
        else {
            return (
                <input onChange={fieldChanged} type="radio" name={pName} id={pId} value={pRValue} />
            );
        }
    }

    console.log("... end: MatchingResult ...");
    return (
        <main className="matching_results">
            <div className="container__filters">
                <div className="filter">
                    <p>Sterilized</p>
                    <label htmlFor="sterilized_yes">
                        {renderRadioInput('neutered','sterilized_yes',true,filterRecord.neutered)}
                        Yes
                    </label>
                    <label htmlFor="sterilized_no">
                        {renderRadioInput('neutered','sterilized_no',false,filterRecord.neutered)}
                        No
                    </label>
                </div>
                <div className="filter">
                    <p>Gender</p>
                    <label htmlFor="gender_female">
                        {renderRadioInput('gender','gender_female','Female',filterRecord.gender)}
                        Female
                    </label>
                    <label htmlFor="gender_male">
                        {renderRadioInput('gender','gender_male','Male',filterRecord.gender)}
                        Male
                    </label>
                </div>
                <div className="filter">
                    <p>Good with</p>
                    <label htmlFor="good_with_kids">
                        {renderRadioInput('goodwith','good_with_kids','Kids',filterRecord.goodwith)}
                        Kids
                    </label>
                    <label htmlFor="good_with_experience_tutor">
                        {renderRadioInput('goodwith','good_with_experience_tutor','Experienced Tutor',filterRecord.goodwith)}
                        Experienced Tutor
                    </label>
                    <label htmlFor="good_with_other_cats">
                        {renderRadioInput('goodwith','good_with_other_cats','likesCats',filterRecord.goodwith)}
                        Other cats
                    </label>
                </div>
            </div>
            <div className="container__results">
                <div className="container__title">
                    <h1>Your Matches</h1>
                    <NavLink onClick={retakeQuizClicked} to={props.cfgData.FE_ROUTE_QUESTIONAIRE_START}>
                        {props.cfgData.USER_SETTINGS_HEADERTXT_02}
                    </NavLink>
                    <br /><br />
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
                            filterRecord ={filterRecord}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
};

export default MatchingResult;