import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Icon } from '../Icon';
import styles from './styles.module.scss';
import classNames from 'classnames';
export const ButtonHeart = ({ onClick, like = false, children, className, ...props }) => {
    const [showFloatingHeart, setShowFloatingHeart] = useState(false);
    return (_jsxs("button", { ...props, onClick: (event) => {
            if (onClick) {
                onClick(event);
            }
            if (!like) {
                setShowFloatingHeart(true);
                setTimeout(() => setShowFloatingHeart(false), 1000);
            }
        }, className: classNames(className, styles.button, { [styles.isLike]: like }), children: [_jsxs("div", { className: styles.wrapper, children: [_jsx(Icon, { className: classNames(styles.heartLike), type: "heartLike" }), _jsx(Icon, { className: classNames(styles.icon), type: "heart" }), showFloatingHeart && _jsx("div", { className: styles.floatingHeart, children: "\u2764\uFE0F" })] }), children] }));
};
