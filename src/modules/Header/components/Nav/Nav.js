import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import styles from './Nav.module.scss';
import { useTranslation } from 'react-i18next';
const activeNavLink = ({ isActive }) => classNames(styles.link, {
    [styles.active ?? '']: isActive,
});
export const Nav = ({ type }) => {
    const { t } = useTranslation();
    return (_jsx("nav", { className: classNames(styles[`nav${type}`], styles.nav), children: _jsxs("ul", { className: styles.list, children: [_jsx("li", { className: styles.item, children: _jsx(NavLink, { className: activeNavLink, to: '/', "aria-label": t('navigation.home'), children: t('navigation.home') }) }), _jsx("li", { className: styles.item, children: _jsx(NavLink, { className: activeNavLink, to: '/phones', "aria-label": t('navigation.phones'), children: t('navigation.phones') }) }), _jsx("li", { className: styles.item, children: _jsx(NavLink, { className: activeNavLink, to: '/tablets', "aria-label": t('navigation.tablets'), children: t('navigation.tablets') }) }), _jsx("li", { className: styles.item, children: _jsx(NavLink, { className: activeNavLink, to: '/accessories', "aria-label": t('navigation.accessories'), children: t('navigation.accessories') }) })] }) }));
};
