import React, { useEffect, useState } from 'react';
import axios from 'axios';
import seeYourResultsCSS from './SeeYourResults.css';

const SeeYourResults = (props) => {
    const [firstname, setFirstname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [answerArr] = useState([]);

    useEffect(() => {
        //axios.post('http://localhost:3001/viewresult', answerArr)
        fetch("/matchquiz")
            .then(response => {
                setFirstname('Test');
                setEmail('');
                setPassword('');
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div>SeeYourResults - Page</div>
    )
};

export default SeeYourResults;
