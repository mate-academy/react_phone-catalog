import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Icon } from '../Icon';
import styles from './styles.module.scss';
import classNames from 'classnames';
export const ButtonSecond = ({ iconFlipX = false, children, className, ...props }) => {
    console.log('ButtonSecond');
    return (_jsxs("button", { ...props, className: classNames(className, styles.button), children: [_jsx("div", { className: styles.wrapper, children: _jsx(Icon, { className: classNames(styles.icon, { [styles.iconFlip]: iconFlipX }), type: "arrowRight" }) }), children] }));
};
