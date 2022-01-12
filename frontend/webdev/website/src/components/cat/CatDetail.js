import React from 'react';
import { Link } from 'react-router-dom';
import catDetailCSS from './CatDetail.css';

import iconHeart from '../../images/icons/heart.svg';
import iconArrowRight from '../../images/icons/arrow-right.svg';
import iconArrowLeft from '../../images/icons/arrow-left.svg';
import catImage from '../../images/img/catProfile01.jpg'; 

const CatDetails = () => { 
    return (
        <main className="cat_profile">
            <div className="container__return">
                <Link to="/matching/results">&#9166; Return to Matches</Link>
            </div>
            <div className="container__top_cat_profile">
                <div className="container__cat_profile_picture">
                    <div className="container__img_cat_profile">
                        <img src={catImage} className="img__cat_profile" alt="A brown Birman Mix cat in a blue background." />
                        <div className="icon__save">
                            <img src={iconHeart} alt="Heart this cat" />
                        </div>
                        <div className="icon__picture_navigation">
                            <img src={iconArrowLeft} alt="Previous cat" />
                            <img src={iconArrowRight} alt="Next cat" />
                        </div>
                    </div>
                </div>

                <div className="container__cat_profile_description">
                    <div className="container__cat_profile_heading">
                        <div className="heading__cat_profile">
                            <h1 className="title__cat_profile">Oliver</h1>
                            <span className="percentage_score">85%</span>
                        </div>
                        <ul className="tags__cat_profile">
                            <li className="cat_profile__tag">Affectionate</li>
                            <li className="cat_profile__tag">Vocal</li>
                            <li className="cat_profile__tag">Sweet</li>
                            <li className="cat_profile__tag">Energetic</li>
                        </ul>
                    </div>
                    <hr></hr>
                    <div className="container__cat_details">
                        <div className="cat_characteristics">
                            <h3>Characteristics</h3>
                            <p>Male, Adult</p>
                        </div>
                        <div className="cat_breed">
                            <h3>Breed</h3>
                            <p>Birman Mix</p>
                        </div>
                        <div className="cat_good-with">
                            <h3>Good With</h3>
                            <p>Children, Other cats</p>
                        </div>
                        <div className="cat_health">
                            <h3>Health</h3>
                            <p>Neutered, Vacinnations up to date, Feline Asthma</p>
                        </div>
                    </div>
                    <div className="container__contact_shelter">
                        <Link to="/shelter">
                            <button id="button__contact_shelter">Contact Shelter</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="container__bottom_cat_profile">
                <hr></hr>
                <h2>Meet Oliver</h2>
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