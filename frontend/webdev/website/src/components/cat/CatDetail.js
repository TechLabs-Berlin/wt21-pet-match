import React from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import RenderCatTag from './RenderCatTag';
import catDetailCSS from './CatDetail.css';

const CatDetails = (props) => { 
    const iconHeart = props.cfgData.LAYOUT_ICONS_PATH + props.cfgData.ICON_HEART;
    const iconHeartAlt = props.cfgData.ICON_HEART_ALT;
    const iconArrowRight = props.cfgData.LAYOUT_ICONS_PATH + props.cfgData.ICON_ARROW_RIGHT;
    const iconArrowRightAlt = props.cfgData.ICON_ARROW_RIGHT_ALT;
    const iconArrowLeft = props.cfgData.LAYOUT_ICONS_PATH + props.cfgData.ICON_ARROW_LEFT;
    const iconArrowLeftAlt = props.cfgData.ICON_ARROW_LEFT_ALT;
    const matchResultPage = props.cfgData.FE_ROUTE_MATCHING_RESULT;

    /* constants -> maybe to move into cfgData-file */
    const hLineChar = 'Characteristics';
    const hLineBreed = 'Breed';
    const hLineGoodWith = 'Good With';
    const hLineHealth = 'Health';
    const shelterTxt = 'Contact Shelter';

    /* to go back to machting results ... use history */
    const history = useHistory();
    /* read out catData passed as state parameter to CatDetails */

    const location = useLocation();
    console.log("======== CAT DETAIL ===========");
    console.log(location);
    const catData = location.state.resultArr.resultArr;
    const resultArr = location.state.resultArr.resultArr;
    const actIndex = location.state.catIndex;
    console.log(actIndex);
    console.log(catData);

    /* catData from  DB  */
    const catImage = props.cfgData.CAT_IMAGES_PATH + catData.Result[actIndex].catData.img;
    const catImageAlt = catData.Result[actIndex].catData.alttext;
    const catName = catData.Result[actIndex].catData.catName;
    const catTags = catData.Result[actIndex].catData.tags;
    const catBreed = catData.Result[actIndex].catData.breed;
    const catNeutered = catData.Result[actIndex].catData.neutered;
    const catHealth = catData.Result[actIndex].catData.healthIssue;
    const catGood = catData.Result[actIndex].catData.goodwith;
    const catLikesCats = catData.Result[actIndex].catData.likesCats;
    let catAge = 'Kitten';
    if (catData.Result[actIndex].catData.age > 1) {
        catAge = 'Adult';
    }

    function renderBreed(pBreed, pHL) {
        if (pBreed !== null) {
            return (
                <div className="cat_breed">
                    <h3>{pHL}</h3>
                    <p>{pBreed}</p>
                </div>                
            );

        }
        else {
            return ('');
        }
    }

    function renderGoodWith(pGood, pLikesCats, pHL) {
        let goodTxt = '';
        if (pLikesCats) {
            goodTxt = goodTxt + 'Likes other cats';
        }
        else {
            goodTxt = goodTxt + 'Does not like other cats';         
        }
        if (pGood) {
            goodTxt = goodTxt + ', ' + pGood;
        }
        return (
            <div className="cat_good-with">
                <h3>{pHL}</h3>
                <p>{goodTxt}</p>
            </div>                
        );        
    }    

    function renderHealth(pNeutered, pHealth, pHL) {
        let healthIssueTxt = '';
        if (pNeutered) {
            healthIssueTxt = healthIssueTxt + 'Neutered';
        }
        else {
            healthIssueTxt = healthIssueTxt + 'Not neutered';
        }
        if (pHealth) {
            healthIssueTxt = healthIssueTxt + ', Cat has some health issues.';
        }
        return (
            <div className="cat_health-with">
                <h3>{pHL}</h3>
                <p>{healthIssueTxt}</p>
            </div>                
        );
    }

    return (
        <main className="cat_profile">
            <div className="container__return">
                <Link to={{ pathname: matchResultPage, state: { resultArr: {resultArr} } }} >
                    &#9166; Return to Matches
                </Link>
            </div>
            <div className="container__top_cat_profile">
                <div className="container__cat_profile_picture">
                    <div className="container__img_cat_profile">
                        <img src={catImage} className="img__cat_profile" alt={catImageAlt} />
                        <div className="icon__save">
                            <img src={iconHeart} alt={iconHeartAlt} />
                        </div>
                        <div className="icon__picture_navigation">
                            <img src={iconArrowLeft} alt={iconArrowLeftAlt} />
                            <img src={iconArrowRight} alt={iconArrowRightAlt} />
                        </div>
                    </div>
                </div>

                <div className="container__cat_profile_description">
                    <div className="container__cat_profile_heading">
                        <div className="heading__cat_profile">
                            <h1 className="title__cat_profile">{catName}</h1>
                        </div>
                        <ul className="tags__cat_profile">
                            {catTags.map((catTag, index) => (
                                <RenderCatTag key={index} index={index} catTag={catTag} />
                            ))}
                        </ul>
                    </div>
                    <hr></hr>
                    <div className="container__cat_details">
                        <div className="cat_characteristics">
                            <h3>{hLineChar}</h3>
                            <p>{catData.Result[actIndex].catData.gender},&nbsp;{catAge}</p>
                        </div>
                        {renderBreed(catBreed,hLineBreed)}
                        {renderGoodWith(catGood,catLikesCats,hLineGoodWith)}
                        {renderHealth(catNeutered,catHealth,hLineHealth)}
                    </div>
                    <div className="container__contact_shelter">
                        <Link to={props.cfgData.FE_ROUTE_SHELTER}>
                            <button id="button__contact_shelter">{shelterTxt}</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="container__bottom_cat_profile">
                <hr></hr>
                <h2>Meet&nbsp;{catName}</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut massa venenatis, tempor erat et,
                    condimentum metus. Aenean at lectus ut lectus sodales porttitor. Fusce porttitor pulvinar lorem et
                    porttitor. Proin non vestibulum dui. Donec sed commodo nisl. Fusce ut nulla sapien. Quisque accumsan
                    sollicitudin nulla semper luctus.
                    Praesent imperdiet sodales purus, vitae venenatis felis. Cras efficitur neque in augue iaculis, sed
                    posuere sem efficitur. Ut sit amet nibh at ex elementum aliquet. Nam rutrum dolor rhoncus ultricies
                    finibus. Mauris non lacus et tortor laoreet vehicula et et nibh. Pellentesque laoreet lorem at tincidunt
                    hendrerit. Sed eu metus mattis, commodo sapien sed, vulputate lectus.
                </p>
            </div>
        </main>
    );
};

export default CatDetails;