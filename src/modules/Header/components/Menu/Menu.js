import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import classNames from 'classnames';
import { TopBar } from '../TopBar';
import styles from './Menu.module.scss';
import { Nav } from '../Nav';
import { NavLink } from 'react-router-dom';
import { useCart } from '@/app/providers/Cart';
import { IconWithCounter } from '@/components/IconWithCounter';
import { useFavourites } from '@/app/providers/Favorities';
export const Menu = ({ isOpen, setOpen, }) => {
    const { cart } = useCart();
    const { favourites } = useFavourites();
    return (_jsxs("aside", { className: classNames(styles.menu, { [styles.isOpen]: isOpen }), children: [_jsx(TopBar, { setOpen: setOpen, type: "Menu" }), _jsx(Nav, { type: "Menu" }), _jsxs("div", { className: styles.bottomContainer, children: [_jsx(NavLink, { to: "/favorites", className: ({ isActive }) => {
                            return classNames(styles.icon, { [styles.active]: isActive });
                        }, children: _jsx(IconWithCounter, { count: favourites.length, type: "heart" }) }), _jsx(NavLink, { to: "/cart", className: ({ isActive }) => {
                            return classNames(styles.icon, { [styles.active]: isActive });
                        }, children: _jsx(IconWithCounter, { count: cart.length, type: "cart" }) })] })] }));
};
