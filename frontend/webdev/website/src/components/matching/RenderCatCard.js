import React from "react";
import { Link } from 'react-router-dom';

const RenderCatCard = (props) => {
    console.log("=========================================");
    console.log("... begin: RenderCatCard ...");
    console.log(props);
    let catToShow = props.catToShow;
    let resultArr = props.resultArr;
    let catImage = props.imgPath + catToShow.catData.img;
    let catProfilePage = props.catProfilePage;  
    /* 
    console.log("=========================================");
    console.log("... begin: RenderCatCard ...");
    console.log("... end: RenderCatCard ...");
    console.log("=========================================");
    */
    return (
        <div className="cat_card">
            <div className="img__card">
                <img width="200" height="120" src={catImage} alt={catToShow.catData.alttext} />
            </div>
            <div className="description__card">
                <div className="container__card_title">
                    <h2 className="cat_name">{catToShow.catData.catName}</h2>
                    <div className="a__more_details">
                        <Link to={{ pathname: catProfilePage, state: { resultArr: {resultArr}, catIndex: props.index} }} >
                            More Details &#10132;
                        </Link>
                    </div>
                </div>
                <h3 className="cat_gender_age">{catToShow.catData.gender}, {catToShow.catData.age} y.o.</h3>
                <h4 className="cat_shelter">{catToShow.catData.shelterName}</h4>
            </div>
            <div className="a__cat_profile">
                <Link to={{ pathname: catProfilePage, state: { resultArr: {resultArr} } }} >
                    <span></span>
                </Link>
            </div>
        </div>
    );
};

export default RenderCatCard;