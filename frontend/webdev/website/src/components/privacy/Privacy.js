import React from 'react';
import privacyCSS from './Privacy.css';

const Privacy = (props) => {
    const privacyHeaderImg = props.cfgData.LAYOUT_IMAGES_PATH + props.cfgData.PRIVACY_HEADERIMG;
    const privacyHeaderImg_ALT = props.cfgData.PRIVACY_HEADERIMG_ALT;

    return (
        <main className="main__privacy_policy">
            <div className="container__img_privacy_policy">
                <h1>Privacy Policy</h1>
                <img src={privacyHeaderImg} alt={privacyHeaderImg_ALT} />
            </div>
            <div className="container__text_privacy_policy">
                <p className="p_privacy_policy">This privacy policy will explain how Pet Match uses the personal data we collect
                    from you when you use our website.
                </p>
                <h2 className="h2_privacy_policy">Topics</h2>
                <ol className="policy_text">
                    <li className="li_privacy_policy"><a href="#what_data_we_collect">What data do we collect?</a></li>
                    <li className="li_privacy_policy"><a href="#how_we_collect_data">How do we collect your data?</a></li>
                    <li className="li_privacy_policy"><a href="#how_we_use_data">How will we use your data?</a></li>
                    <li className="li_privacy_policy"><a href="#how_we_store_data">How do we store your data?</a></li>
                    <li className="li_privacy_policy"><a href="#data_protection_rights">What are your data protection rights?</a></li>
                    <li className="li_privacy_policy"><a href="#what_are_cookies">What are cookies?</a></li>
                    <li className="li_privacy_policy"><a href="#how_we_use_cookies">How do we use cookies?</a></li>
                    <li className="li_privacy_policy"><a href="#what_cookies_we_use">What types of cookies do we use?</a></li>
                    <li className="li_privacy_policy"><a href="#how_to_manage_cookies">How to manage your cookies</a></li>
                    <li className="li_privacy_policy"><a href="#privacy_policy_other_websites">Privacy policies of other websites</a></li>
                    <li className="li_privacy_policy"><a href="#changes_to_our_policy">Changes to our privacy policy</a></li>
                    <li className="li_privacy_policy"><a href="#how_to_contact_us">How to contact us</a></li>
                    <li className="li_privacy_policy"><a href="#how_to_contact_authorities">How to contact the appropriate authorities</a></li>
                </ol>
                <h2 className="h2_privacy_policy" id="what_data_we_collect">What data do we collect?</h2>
                <p className="p_privacy_policy">Pet Match collects the following data:</p>
                <ul>
                    <li className="li_privacy_policy">Personal identification information:
                        <ul>
                            <li className="li_privacy_policy">Name</li>
                            <li className="li_privacy_policy">Email address</li>
                        </ul>
                    </li>
                </ul>
                <h2 className="h2_privacy_policy" id="how_we_collect_data">How do we collect your data?</h2>
                <p className="p_privacy_policy">You directly provide Pet Match with most of the data we collect. We collect data
                    and process data when you:
                </p>
                <ul>
                    <li className="li_privacy_policy">Register online and save your matches.</li>
                    <li className="li_privacy_policy">Use or view our website via your browser's cookies.</li>
                </ul>
                <h2 className="h2_privacy_policy" id="how_we_use_data">How will we use your data?</h2>
                <p className="p_privacy_policy">Pet Match collects your data so that we can:</p>
                <ul>
                    <li className="li_privacy_policy">Manage your account.</li>
                </ul>
                <p className="p_privacy_policy">If you agree, Pet Match will share your data with shelters so that they may
                    offer you their products and services.
                </p>
                <ul>
                    <li className="li_privacy_policy">Shelter 1</li>
                    <li className="li_privacy_policy">Shelter 2</li>
                    <li className="li_privacy_policy">Shelter 3</li>
                </ul>
                <h2 className="h2_privacy_policy" id="how_we_store_data">How do we store your data?</h2>
                <p className="p_privacy_policy">Pet Match securely stores your data at Data Center Frankfurt.</p>
                <p className="p_privacy_policy">Pet Match will keep your personal information for 2 years. Once this time period
                    has expired, we will delete your data by overwriting.
                </p>
                <h2 className="h2_privacy_policy" id="data_protection_rights">What are your data protection rights?</h2>
                <p className="p_privacy_policy">Pet Match would like to make sure you are fully aware of all of your data
                    protection rights. Every user is entitled to the following:
                </p>
                <ul>
                    <li className="li_privacy_policy">The right to access: You have the right to request Pet Match for copies of
                        your personal data. We may charge you a small fee for this service.
                    </li>
                    <li className="li_privacy_policy">The right to rectification: You have the right to request that Pet Match
                        correct any information you believe is inaccurate. You also have the right to request Pet Match to
                        complete the information you believe is incomplete.
                    </li>
                    <li className="li_privacy_policy">The right to erasure: You have the right to request that Pet Match erase
                        your personal data, under certain conditions.
                    </li>
                    <li className="li_privacy_policy">The right to restrict processing: You have the right to request that Pet
                        Match restrict the processing of your personal data, under certain conditions.
                    </li>
                    <li className="li_privacy_policy">The right to object to processing: You have the right to object to Pet
                        Match's processing of your personal data, under certain conditions.
                    </li>
                    <li className="li_privacy_policy">The right to data portability: You have the right to request that Pet
                        Match transfer the data that we have collected to another organization, or directly to you, under
                        certain conditions.
                    </li>
                </ul>
                <p className="p_privacy_policy">If you make a request, we have one month to respond to you. If you would like to
                    exercise any of these rights, please contact us at our email:
                </p>
                <a href="mailto:info@petmatch.com">info@petmatch.com</a>
                <h2 className="h2_privacy_policy" id="what_are_cookies">What are cookies?</h2>
                <p className="p_privacy_policy">Cookies are text files placed on your computer to collect standard Internet log
                    information and visitor behavior information. When you visit our website, we may collect information
                    from you automatically through cookies or similar technology.
                </p>
                <p className="p_privacy_policy">For further information, visit <a href="http://allaboutcookies.org">allaboutcookies.org</a>.
                </p>
                <h2 className="h2_privacy_policy" id="how_we_use_cookies">How do we use cookies?</h2>
                <p className="p_privacy_policy">Pet Match uses cookies in a range of ways to improve your experience on our
                    website, including:
                </p>
                <ul>
                    <li className="li_privacy_policy">Keeping you signed in.</li>
                    <li className="li_privacy_policy">Understanding how you use our website.</li>
                </ul>
                <h2 className="h2_privacy_policy" id="what_cookies_we_use">What types of cookies do we use?</h2>
                <p className="p_privacy_policy">There are a number of different types of cookies, however, our website uses:</p>
                <ul>
                    <li className="li_privacy_policy">Functionality: Pet Match uses these cookies so that we recognize you on
                        our website and remember your previously selected preferences. These could include what language you
                        prefer and location you are in. A mix of first-party and third-party cookies are used.
                    </li>
                </ul>
                <h2 className="h2_privacy_policy" id="how_to_manage_cookies">How to manage your cookies</h2>
                <p className="p_privacy_policy">You can set your browser not to accept cookies, and the above website tells you
                    how to remove cookies from your browser. However, in a few cases, some of our website features may not
                    function as a result.
                </p>
                <h2 className="h2_privacy_policy" id="privacy_policy_other_websites">Privacy policies of other websites</h2>
                <p className="p_privacy_policy">Pet Match website contains links to other websites. Our privacy policy applies
                    only to our website, so if you click on a link to another website, you should read their privacy policy.
                </p>
                <h2 className="h2_privacy_policy" id="changes_to_our_policy">Changes to our privacy policy</h2>
                <p className="p_privacy_policy">Pet Match keeps its privacy policy under regular review and places any updates
                    on this web page. This privacy policy was last updated on 02 February 2022.
                </p>
                <h2 className="h2_privacy_policy" id="how_to_contact_us">How to contact us</h2>
                <p className="p_privacy_policy">If you have any questions about Pet Match's privacy policy, the data we hold on
                    you, or you would like to exercise one of your data protection rights, please email us at&nbsp;
                    <a href="mailto:info@petmatch.com">info@petmatch.com</a>
                </p>
                <h2 className="h2_privacy_policy" id="how_to_contact_authorities">How to contact the appropriate authorities</h2>
                <p className="p_privacy_policy">Should you wish to report a complaint or if you feel that Pet Match has not
                    addressed your concern in a satisfactory manner, you may contact the Information Commissioner's Office.
                </p>
                <address>
                    Berlin Data Protection Autority &#40;Berliner Beauftragte für Datenschutz und
                    Informationsfreiheit&#41;<br />
                    Friedrichstrasse 219, 10969 Berlin<br />
                    Germany<br />
                    Visitor Entrance: Puttkamerstrasse 16 &#8211; 18, 10969 Berlin<br />
                    Germany<br />
                    Email: <a href="mailto:mailbox@datenschutz-berlin.de">mailbox@datenschutz-berlin.de</a>
                </address>
            </div>
        </main>
    )
};

export default Privacy;