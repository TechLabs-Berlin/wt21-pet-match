import React from 'react';
import aboutUsCSS from './AboutUs.css';

const AboutUs = () => {
    const handleClick = e => {
        console.log('Clicked');
    }

    return (
        <div align="center">
            <br /><br />
            Pet Match - About Us
            <br /><br />
            <button onClick={handleClick}>Click me</button>
            <br /><br />
        </div>
    );
};

export default AboutUs;