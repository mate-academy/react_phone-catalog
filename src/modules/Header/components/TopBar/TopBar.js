import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Logo } from '@/components/Logo';
import { Nav } from '../Nav';
import { Icon } from '@/components/Icon';
import styles from './Topbar.module.scss';
import { useTheme } from '@/app/providers/Theme/ThemeContext';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IconWithCounter } from '@/components/IconWithCounter';
import { useCart } from '@/app/providers/Cart';
import { useFavourites } from '@/app/providers/Favorities';
export const TopBar = ({ type, setOpen, }) => {
    const { theme, toggleTheme } = useTheme();
    const { i18n } = useTranslation();
    const { favourites } = useFavourites();
    const { cart } = useCart();
    return (_jsxs("div", { className: styles.topbar, children: [type === 'Header' && (_jsxs(_Fragment, { children: [_jsxs("div", { className: styles.leftContainer, children: [_jsx(Logo, { type: "Header", className: '' }), _jsx(Nav, { type: "Header" })] }), _jsxs("div", { className: styles.rightContainer, children: [_jsxs("div", { style: { display: 'flex', gap: '5px' }, children: [_jsx("button", { onClick: () => i18n.changeLanguage('ua'), children: "UA" }), _jsx("button", { onClick: () => i18n.changeLanguage('en'), children: "EN" })] }), _jsx("button", { className: styles.swicherThemeContainer, onClick: () => toggleTheme(), children: _jsx("div", { className: classNames(styles.swicherTheme, {
                                        [styles.swicherThemeDark]: theme === 'dark',
                                    }) }) }), _jsx(NavLink, { "aria-label": "favorites", to: "/favorites", className: ({ isActive }) => {
                                    return classNames(styles.icon, styles.iconHeartAndCart, {
                                        [styles.active]: isActive,
                                    });
                                }, children: _jsx(IconWithCounter, { type: "heart", count: favourites.length }) }), _jsx(NavLink, { to: "/cart", className: ({ isActive }) => {
                                    return classNames(styles.icon, styles.iconHeartAndCart, {
                                        [styles.active]: isActive,
                                    });
                                }, children: _jsx(IconWithCounter, { type: "cart", count: cart.length }) }), _jsx("button", { className: classNames(styles.icon, styles.iconMenu), onClick: () => {
                                    setOpen(true);
                                }, children: _jsx(Icon, { type: "menu" }) })] })] })), type === 'Menu' && (_jsxs(_Fragment, { children: [_jsx("div", { className: styles.leftContainer, children: _jsx(Logo, { type: "Header", className: '' }) }), _jsxs("div", { className: styles.rightContainer, children: [_jsx("button", { className: styles.swicherThemeContainer, onClick: () => toggleTheme(), children: _jsx("div", { className: classNames(styles.swicherTheme, {
                                        [styles.swicherThemeDark]: theme === 'dark',
                                    }) }) }), _jsx("button", { className: styles.icon, onClick: () => {
                                    setOpen(false);
                                }, children: _jsx(Icon, { type: "close" }) })] })] }))] }));
};
