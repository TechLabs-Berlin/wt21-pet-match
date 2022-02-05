
/* COPIED from Header.js */
        if (localStorage.getItem("userID") === null) {
            localStorage.setItem("userID",userID);
        }
        else {
            setUserID(localStorage.getItem("userID"));
        }
        if (localStorage.getItem("firstName") === null) {
            localStorage.setItem("firstName",firstName);
        }
        else {
            setFirstName(localStorage.getItem("firstName"));
        }
        if (localStorage.getItem("loginState") === null) {
            localStorage.setItem("loginState", loginState);
        }
        else {
            setLoginState(localStorage.getItem("loginState"));
        }
        if (localStorage.getItem("quizTaken") === null) {
            localStorage.setItem("quizTaken", quizTaken);
        }
        else {
            setQuizTaken(localStorage.getItem("quizTaken"));
        }
        if (localStorage.getItem("loggedIn") === null) {
            localStorage.setItem("loggedIn", loggedIn);
        }
        else {
            setLoggedIn(localStorage.getItem("loggedIn"));
        }
        if (firstRendered === false) {
            localStorage.setItem("yourResultsState","");
            setLogoutClicked(false);
            setFirstRendered(true);
        }
