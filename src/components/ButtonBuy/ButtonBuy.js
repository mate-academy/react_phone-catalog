import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
export const ButtonBuy = ({ selected, children, className, ...props }) => {
    const selectedRef = useRef(selected);
    const [animation, setAnimation] = useState(null);
    useEffect(() => {
        if (selectedRef.current !== selected) {
            setAnimation(selectedRef.current === false ? 'animationSelect' : 'animationDeselect');
        }
        selectedRef.current = selected;
    }, [selected]);
    return (_jsx("button", { ...props, onAnimationEnd: () => {
            setAnimation(null);
        }, className: classNames(className, styles.button, animation && styles[animation], {
            [styles.selected]: selected,
        }), children: children }));
};
