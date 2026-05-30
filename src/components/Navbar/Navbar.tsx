import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import './Navbar.scss';
import logo from '../../img/logo.svg';
import logoLight from '../../img/logoLight.svg';
import heart from '../../img/heart.svg';
import heartLight from '../../img/heartLight.svg';
import bag from '../../img/bagCart.svg';
import bagLight from '../../img/bagCartLigth.svg';
import menu from '../../img/menu.svg';
import menuLight from '../../img/menuLight.svg';
import close from '../../img/close.svg';
import closeLight from '../../img/closeLight.svg';
import { Switcher } from '../Switcher';
import { ThemeContext } from '../Themes';
import { useFavourites } from '../Favourites/FavouritesContext';
import { useCart } from '../BoughtCard/CartContext';

interface NavbarProps {
  setMenuIsOpen: () => void;
  menuIsOpen: boolean;
  setMenuIsClose: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  setMenuIsOpen,
  menuIsOpen,
  setMenuIsClose,
}) => {
  const { theme } = useContext(ThemeContext);
  const { favourites } = useFavourites();
  const { cart } = useCart();
  const isBasicDark = theme === 'dark';

  const totalItemCount = cart.reduce((acc, item) => {
    return acc + (item.quantity || 1);
  }, 0);

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', { 'navbar-item--active': isActive });

  return (
    <header className="header">
      <nav
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="wrapper__navbar">
            <NavLink className="logo" to="/">
              <img
                src={isBasicDark ? logo : logoLight}
                alt="logo"
                className="logo__img"
              />
            </NavLink>
            <div className="navbar-brand">
              <NavLink className={getLinkClass} to="/">
                Home
              </NavLink>

              <NavLink className={getLinkClass} to="/phones">
                Phones
              </NavLink>

              <NavLink className={getLinkClass} to="/tablets">
                Tablets
              </NavLink>

              <NavLink className={getLinkClass} to="/accessories">
                Accessories
              </NavLink>
            </div>
          </div>

          <Switcher />

          <div className="buttons__menu">
            <NavLink className="logo likes" to="/favourites">
              <img src={isBasicDark ? heart : heartLight} alt="heart" />
              {favourites.length > 0 && (
                <span className="badge2">{favourites.length}</span>
              )}
            </NavLink>

            <NavLink className="logo shopping" to="/cart">
              <img src={isBasicDark ? bag : bagLight} alt="shopping" />
              {cart.length > 0 && (
                <span className="badge">{totalItemCount}</span>
              )}
            </NavLink>

            {menuIsOpen ? (
              <div className="logo menu close" onClick={setMenuIsClose}>
                <img src={isBasicDark ? close : closeLight} alt="close" />
              </div>
            ) : (
              <div className={`logo menu`} onClick={setMenuIsOpen}>
                <img src={isBasicDark ? menu : menuLight} alt="menu" />
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
