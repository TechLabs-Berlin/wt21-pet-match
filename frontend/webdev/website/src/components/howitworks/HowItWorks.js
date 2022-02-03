import React from 'react';
import howItWorksCSS from './HowItWorks.css';

const HowItWorks = (props) => {
    const howItWroksHeaderImg = props.cfgData.LAYOUT_IMAGES_PATH + props.cfgData.HOWITWORKS_HEADERIMG;
    const howItWroksHeaderImg_ALT = props.cfgData.HOWITWORKS_HEADERIMG_ALT;
    const databaseIcon = props.cfgData.LAYOUT_ICONS_PATH + props.cfgData.ICON_DATABASE;
    const databaseIcon_ALT = props.cfgData.ICON_DATABASE_ALT;
    const documentIcon = props.cfgData.LAYOUT_ICONS_PATH + props.cfgData.ICON_DOCUMENT;
    const documentIcon_ALT = props.cfgData.ICON_DOCUMENT_ALT;
    const checkIcon = props.cfgData.LAYOUT_ICONS_PATH + props.cfgData.ICON_CHECK;
    const checkIcon_ALT = props.cfgData.ICON_CHECK_ALT;

    return (
        <main className="main__how_it_works">
            <div className="container__top_howitworks">
                <div className="container__howitworks_picture">
                    <img src={howItWroksHeaderImg} id="img__howitworks"
                        alt={howItWroksHeaderImg_ALT} />
                </div>
                <div className="container__howitworks_text">
                    <h1 className="title__howitworks">How it works</h1>
                    <h2 className="subtitle__howitworks">Do you want to adopt a cat in Germany but doesn't know where to start
                        or what to look for in your perfect companion?
                        <br />
                        <span className="subtitle__howitworks">We can help you!</span>
                    </h2>
                </div>
            </div>
            <div className="container__bottom_howitworks">
                <div className="bulletpts__howitworks">
                    <div className="icon__howitworks">
                        <img src={databaseIcon} alt={databaseIcon_ALT} />
                    </div>
                    <div className="text_bulletpts">
                        <h3>We developed a database of cats available for adoption in Germany including their personality
                            traits, and compatibility metrics.
                        </h3>
                    </div>
                </div>
                <div className="bulletpts__howitworks">
                    <div className="icon__howitworks">
                        <img src={documentIcon} alt={documentIcon_ALT} />
                    </div>
                    <div className="text_bulletpts">
                        <h3>You take our online pet-owner matching quiz, and with just a few questions about your
                            preferences and
                            personality, we are able to run the results on our cat database.
                        </h3>
                    </div>
                </div>
                <div className="bulletpts__howitworks">
                    <div className="icon__howitworks">
                        <img src={checkIcon} alt={checkIcon_ALT} />
                    </div>
                    <div className="text_bulletpts">
                        <h3>Our algorithm analyzes your results and provide you with ten compatible
                            matches. If you're interested in any of them, you can contact the shelter directly.
                        </h3>
                    </div>
                </div>
            </div>
        </main>
    )      
};

export default HowItWorks;