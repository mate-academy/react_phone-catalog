import { jsx as _jsx } from "react/jsx-runtime";
import LogoSvg from '@/assets/images/logo/logo.svg?react';
import styles from './Logo.module.scss';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
export const Logo = ({ type, to = '/', className, ...props }) => {
    return (_jsx(Link, { ...props, to: to, className: classNames(styles[`logo${type}`], styles.logo, className), children: _jsx(LogoSvg, { role: "img", "aria-label": "Logo link to home page", className: styles.logoSvg }) }));
};
