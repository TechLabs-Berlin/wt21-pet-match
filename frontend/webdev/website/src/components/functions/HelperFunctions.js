/* Helper Funtions: used in 2 components - SeeYourResults and Login */    
export function renderErrMsg(pErrMsg) {
    if (pErrMsg !== '') {
        return (
            <div className="error__signup"><p>{pErrMsg}</p></div>
        );
    }
}

export function validatePWD(pwd) {
    if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(pwd)) {
        return (true)
    }
    return (false)
}

export function validateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
    }
    return (false)
}    
