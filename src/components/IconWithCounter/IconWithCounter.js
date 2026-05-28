import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { Icon } from '../Icon/Icon';
import classNames from 'classnames';
import styles from './styles.module.scss';
export const IconWithCounter = ({ count, type, className, ...props }) => {
    const prevCount = useRef(count);
    const [isAnimated, setIsAnimated] = useState(false);
    useEffect(() => {
        if (prevCount.current !== count) {
            setIsAnimated(true);
        }
        prevCount.current = count;
    }, [count]);
    return (_jsx("div", { children: _jsxs("div", { className: styles.content, children: [type === 'cart' && _jsx(Icon, { ...props, type: "cart", className: classNames(className) }), type === 'heart' && _jsx(Icon, { ...props, type: "heart", className: classNames(className) }), count !== 0 && (_jsx("div", { className: classNames(styles.counter, {
                        [styles.counterAnimate]: isAnimated,
                    }), onAnimationEnd: () => setIsAnimated(false), children: count }))] }) }));
};
