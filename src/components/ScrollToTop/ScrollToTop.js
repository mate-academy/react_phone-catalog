import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
export const ScrollToTop = () => {
    const { pathname } = useLocation();
    const isFirstRender = useRef(true);
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};
