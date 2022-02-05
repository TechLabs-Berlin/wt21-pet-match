import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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

    /* constants -> maybe to be moved into cfgData.json file */
    const linkTxt = "Return to Matches";
    const hLineGender = 'Gender';
    const hLineAge = 'Age';
    const hLineBreed = 'Breed';
    const hLineGoodWith = 'Good With';
    const hLineNeutered = 'Sterilized?';
    const hLineHealth = 'Health issues?';
    const shelterTxtAva = 'Available at: ';
    const shelterTxtBTN = 'Contact Shelter';
    const breedAlternativeTxt = 'Domestic short/longhair';
    const meetText = 'Meet ';
    const otherCatsText = 'Other cats';
    const yesTxt = 'Yes';
    const noTxt = 'No';
    const yearsOldTxt = " y.o.";

    /* read out catData passed as state parameter to CatDetails page */
    const location = useLocation();
    const catData = location.state.resultArr.resultArr;
    const resultArr = location.state.resultArr.resultArr;
    const actIndex = location.state.catIndex;

    /* catData from  DB  */
    const catImage = props.cfgData.CAT_IMAGES_PATH + catData.Result[actIndex].catData.img;
    const catImageAlt = catData.Result[actIndex].catData.alttext;
    const catName = catData.Result[actIndex].catData.catName;
    const catNameTxt = meetText + catName;
    const catTags = catData.Result[actIndex].catData.tags;
    const catBreed = catData.Result[actIndex].catData.breed;
    const catNeutered = catData.Result[actIndex].catData.neutered;
    const catHealth = catData.Result[actIndex].catData.healthIssue;
    const catGood = catData.Result[actIndex].catData.goodwith;
    const catLikesCats = catData.Result[actIndex].catData.likesCats;
    const catAge = catData.Result[actIndex].catData.age + yearsOldTxt;

    function renderBreed(pBreed, pHL) {
        let breedTxt = pBreed;
        if (breedTxt === null) {
            breedTxt = breedAlternativeTxt;
        }
        if (breedTxt !== null) {
            return (
                <div className="cat_breed">
                    <h3>{pHL}</h3>
                    <p>{breedTxt}</p>
                </div>                
            );
        } 
    }

    function renderGoodWith(pGood, pLikesCats, pHL) {
        let goodTxt = '';
        if (pLikesCats) {
            goodTxt = otherCatsText;
        }        
        if (pGood) {
            if (pLikesCats) {
                goodTxt = pGood + ', ' + goodTxt;
            }
            else {
                goodTxt = pGood;
            }
            
        }
        return (
            <div className="cat_good_with">
                <h3>{pHL}</h3>
                <p>{goodTxt}</p>
            </div>                
        );        
    }    

    function renderNeutered(pNeutered, pNL) {
        let neuteredTxt = '';
        if (pNeutered) {
            neuteredTxt = neuteredTxt + yesTxt;
        }
        else {
            neuteredTxt = neuteredTxt + noTxt;
        }
        return (
            <div className="cat_sterilized">
                <h3>{pNL}</h3>
                <p>{neuteredTxt}</p>
            </div>                
        );
    }

    function renderHealth(pHealth,pHL) {
        let healthIssueTxt = '';
        if (pHealth) {
            healthIssueTxt = healthIssueTxt + yesTxt;
        }
        else {
            healthIssueTxt = healthIssueTxt + noTxt;
        }
        return (
            <div className="cat_health_issues">
                <h3>{pHL}</h3>
                <p>{healthIssueTxt}</p>
            </div>                
        );
    }

    function renderShelterBTN(pTarget, pLink, pBTNTxt) {
        if (pLink !== '') {
            return (
                <div className="container__button_contact_shelter">    
                    <a target={pTarget} href={pLink}>
                        <button className="button__contact_shelter">{pBTNTxt}</button>
                    </a>
                </div>
            );
        }
    }

    function renderLinkTarget(pLink,pShelterName) {
        let actualLink = pLink;
        props.cfgData.SHELTER_LINKS.map((shelterLink, index) => {
            if (shelterLink.shelterName === pShelterName) {
                actualLink = shelterLink.shelterLink;
            }
        });
        return (actualLink);
    }

    function renderShelter(pShelterName, pAvailableTxt, pBTNTxt, pLink) {
        let actualLink = pLink;
        let actualTarget = "_self";
        let newLink = '';
        /* currently we have no page for the Shelter Area ... */
        actualLink = "";
        if (pShelterName !== null && pShelterName.length > 0) {
            newLink = renderLinkTarget(actualLink, pShelterName);
            if (newLink !== actualLink) {
                actualLink = newLink;
                actualTarget = '_blank';
            }
            return (
                <div className="container__contact_shelter">
                    <div className="cat_available_at">
                        <h4>{pAvailableTxt}<span className="cat_shelter">{pShelterName}</span></h4>
                    </div>  
                    {renderShelterBTN(actualTarget,actualLink,pBTNTxt)}
                </div>
            );
        }
    }

    return (
        <main className="cat_profile">
            <div className="container__return">
                <Link to={{ pathname: matchResultPage, state: { resultArr: {resultArr}, filterRecord: location.state.filterRecord } }} >
                    &#9166; {linkTxt}
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
                        <h1 className="title__cat_profile">{catName}</h1>
                        <ul className="tags__cat_profile">
                            {catTags.map((catTag, index) => (
                                <RenderCatTag key={index} index={index} catTag={catTag} />
                            ))}
                        </ul>
                    </div>
                    <hr></hr>
                    <div className="container__cat_details">
                        <div className="cat_gender">
                            <h3>{hLineGender}</h3>
                            <p>{catData.Result[actIndex].catData.gender}</p>
                        </div>
                        <div className="cat_age">
                            <h3>{hLineAge}</h3>
                            <p>{catAge}</p>
                        </div>
                        {renderBreed(catBreed,hLineBreed)}
                        {renderGoodWith(catGood,catLikesCats,hLineGoodWith)}
                        {renderNeutered(catNeutered, hLineNeutered)}
                        {renderHealth(catHealth,hLineHealth)}
                    </div>
                    {renderShelter(catData.Result[actIndex].catData.shelterName,shelterTxtAva,shelterTxtBTN,props.cfgData.FE_ROUTE_SHELTER)}
                </div>
            </div>
            <div className="container__bottom_cat_profile">
                <hr></hr>
                <h2>{catNameTxt}</h2>
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