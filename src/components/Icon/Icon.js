import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './Icon.module.scss';
import IconSvg from '@/assets/images/icons/menu.svg?react';
import HeartSvg from '@/assets/images/icons/heart.svg?react';
import HeartLikeSvg from '@/assets/images/icons/heartLike.svg?react';
import CloseSvg from '@/assets/images/icons/close.svg?react';
import CartSvg from '@/assets/images/icons/cart.svg?react';
import ArrowRightSvg from '@/assets/images/icons/arrow-right.svg?react';
import classNames from 'classnames';
export const Icon = ({ type, className, ...props }) => {
    return (_jsxs(_Fragment, { children: [type === 'menu' && _jsx(IconSvg, { ...props, className: classNames(className, styles['icon']) }), type === 'heart' && (_jsx(HeartSvg, { ...props, className: classNames(className, styles['icon']) })), type === 'heartLike' && (_jsx(HeartLikeSvg, { ...props, className: classNames(className, styles['icon']) })), type === 'close' && (_jsx(CloseSvg, { ...props, className: classNames(className, styles['icon']) })), type === 'cart' && _jsx(CartSvg, { ...props, className: classNames(className, styles['icon']) }), type === 'arrowRight' && (_jsx(ArrowRightSvg, { ...props, className: classNames(className, styles['icon']) }))] }));
};
