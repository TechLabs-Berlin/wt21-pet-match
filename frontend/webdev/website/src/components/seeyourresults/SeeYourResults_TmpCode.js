
            
                        localStorage.setItem("userId", tmpRecord.userId);
                        localStorage.setItem("firstName", tmpRecord.firstName);
                        localStorage.setItem("quizTaken", tmpRecord.quizTaken);
                        localStorage.setItem("loggedIn", true);
                        localStorage.setItem("loginState", 'O'); 
            
            
            else if (yourResultsState === 'CR') {
                console.log("... SeeYourResults, useEffect, yourResultsState = /register ... ");
                axios.post('http://localhost:3001/register',chosenAnswer[0])
                    .then (res => {
                        if (parseInt(res.status) === 200) {
                            console.log(" ... SeeYourResult, useEffect, axios.post, then, if status = 200 ...");
                            console.log(res.data);
                            return res.data;
                        } 
                        else {
                            console.log(" ... SeeYourResult, useEffect, axios.post, then, if status !== 200 ...");
                        }
                    }).then(jsonRes => {
                        console.log(" ... SeeYourResult, useEffect, axios.post, then, then, jsonRes ...");
                        console.log(jsonRes);
                        setResultArr(jsonRes);
                        userFromDB.userID = jsonRes.userID;
                        userFromDB.firstname = jsonRes.firstname;
                        userFromDB.lastname = jsonRes.lastname;
                        userFromDB.email = jsonRes.email;
                        userFromDB.password = jsonRes.password;
                        userFromDB.quizTaken = jsonRes.quizTaken;
                        userFromDB.memberAccount = jsonRes.memberAccount;
                        userFromDB.acceptedConsent = jsonRes.acceptedConsent;
                        setUserRecord(userFromDB);
                        setBackendDone(true);
                    })
                    .catch(error => {
                        console.log(" ... SeeYourResult, useEffect, axios.post, catch ...");
                        console.log(error);
                        setBackendError(true);
                        setBackendErrorMsg(error);
                        setBackendDone(false);
                    }); 
                console.log(" ... SeeYourResult, useEffect, after axios.post /register ...");
                console.log(resultArr);
            }
            else {
                console.log("... SeeYourResults, useEffect, yourResultsState = unknown ... ");
                console.log(yourResultsState);
            }
        }



    /* user actions & getting matching results done successfully -> show up matching results - page */
    if ((seeMachtingResultPage) && !(backendError)) {
        return (
            <Redirect to={props.cfgData.FE_ROUTE_MATCHING_RESULT} />
        );
    }
    else {
        setSeeMachtingResultPage(false);
        errorMsgToShow = backendErrorMsg;
        setBackendError(false);
        setBackendErrorMsg('');
    }



               if (yourResultsState === 'YM') {
                console.log("... SeeYourResults, useEffect, yourResultsState = /yourmatchesresult ... ");
                tmpArr = { "userID": "61ef45acd9dc72a2678fbb46" };
                console.log("==== BEFORE AXIOS =====");
                console.log(tmpArr);
                axios.post('http://localhost:3001/yourmatchesresult', tmpArr)
                    .then (res => {
                        if (parseInt(res.status) === 200) {
                            console.log(" ... SeeYourResult, useEffect, axios.post, then, if status = 200 ...");
                            console.log(res.data);
                            return res.data;
                        } 
                        else {
                            console.log(" ... SeeYourResult, useEffect, axios.post, then, if status !== 200 ...");
                        }
                    }).then(jsonRes => {
                        console.log(" ... SeeYourResult, useEffect, axios.post, then, then, jsonRes ...");
                        console.log(jsonRes);
                        setResultArr(jsonRes);
                        userFromDB.userID = jsonRes.userID;
                        userFromDB.quizTaken = jsonRes.quizTaken;
                        setUserRecord(userFromDB);
                        setBackendDone(true);
                    })
                    .catch(error => {
                        console.log(" ... SeeYourResult, useEffect, axios.post, catch ...");
                        console.log(error);
                        setBackendError(true);
                        setBackendErrorMsg(error);
                        setBackendDone(false);
                    }); 
                console.log("==== AFTER AXIOS =====");
                console.log(" ... SeeYourResult, useEffect, after axios.post /viewresult ...");
                console.log(resultArr);
            }            
 
