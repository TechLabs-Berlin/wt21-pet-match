import { useEffect } from "react";
import { useLocation } from "react-router";

/* make sure to scroll to the top of the page every time a user changes main page */
const ScrollToTop = (props) => {
    const location = useLocation();
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return <>{props.children}</>
};

export default ScrollToTop;