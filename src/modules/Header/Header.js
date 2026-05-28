import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import { TopBar } from './components/TopBar';
import { Menu } from './components/Menu/Menu';
import { useLocation } from 'react-router-dom';
export const Header = () => {
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const { pathname } = useLocation();
    useEffect(() => {
        if (isOpenMenu) {
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = '';
        }
    }, [isOpenMenu]);
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsOpenMenu(false);
    }, [pathname]);
    return (_jsxs(_Fragment, { children: [_jsx("header", { className: styles['header'], children: _jsx(TopBar, { setOpen: setIsOpenMenu, type: "Header" }) }), _jsx(Menu, { isOpen: isOpenMenu, setOpen: setIsOpenMenu })] }));
};
