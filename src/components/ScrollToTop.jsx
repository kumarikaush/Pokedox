//to scroll page back to top which is an issue while using router

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}