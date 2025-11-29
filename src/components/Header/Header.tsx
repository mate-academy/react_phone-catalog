import { NavLink, useLocation } from 'react-router-dom';
import logo from '../../images/Logo.svg';
import './Header.scss';
import { useContext, useMemo, useState } from 'react';
import { BurgerMenu } from '../BurgerMenu';
import favourites from '../../Icons/Vector (Stroke).svg';
import cart from '../../Icons/Group 17.svg';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { ItemsCounter } from '../ItemsCounter';
// eslint-disable-next-line max-len
import { FavoritesContext } from '../../contexts/FavoritesContext/FavoritesContext';
import { CartContext } from '../../contexts/CartContext';

export const Header = () => {
  const { favorites } = useContext(FavoritesContext);
  const { cartProducts } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  const cartCounter = useMemo(() => {
    return cartProducts.reduce((prev, product) => {
      return prev + product.quantity;
    }, 0);
  }, [cartProducts]);
  const handleSetIsOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <header
      className={cn('header', {
        on__allpage: isOpen,
      })}
    >
      {isOpen}
      <div className="header__top">
        <NavLink to="/">
          <img src={logo} alt="logo-img" />
        </NavLink>
        <nav className="nav-bar">
          <ul className="nav__list">
            <li className="nav__list--menu-items">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? 'nav__link nav__link--active' : 'nav__link'
                }
              >
                HOME
              </NavLink>
            </li>
            <li className="nav__list--menu-items">
              <NavLink
                to="/phones"
                className={({ isActive }) =>
                  isActive ? 'nav__link nav__link--active' : 'nav__link'
                }
              >
                PHONES
              </NavLink>
            </li>
            <li className="nav__list--menu-items">
              <NavLink
                to="/tablets"
                className={({ isActive }) =>
                  isActive ? 'nav__link nav__link--active' : 'nav__link'
                }
              >
                TABLETS
              </NavLink>
            </li>
            <li className="nav__list--menu-items">
              <NavLink
                to="/accessories"
                className={({ isActive }) =>
                  isActive ? 'nav__link nav__link--active' : 'nav__link'
                }
              >
                ACCESSORIES
              </NavLink>
            </li>
          </ul>
          <div className="nav__buttons">
            <Link to="/favourites" className="icon__link">
              <div className="img__wrapper">
                <img src={favourites} alt="favourites"></img>
                {favorites.length >= 1 && (
                  <ItemsCounter quantity={favorites.length}></ItemsCounter>
                )}
              </div>
            </Link>
            <Link to="/cart" className="icon__link" state={{ from: pathname }}>
              <div className="img__wrapper">
                <img src={cart} alt="cart" />
                {cartProducts.length >= 1 && (
                  <ItemsCounter quantity={cartCounter}></ItemsCounter>
                )}
              </div>
            </Link>
          </div>
        </nav>

        {!isOpen ? (
          <button
            className="icon icon--menu"
            onClick={handleSetIsOpen}
          ></button>
        ) : (
          <button
            className="icon icon--menu--cross"
            onClick={handleSetIsOpen}
          ></button>
        )}
      </div>
      <BurgerMenu
        isOpen={isOpen}
        handleSetIsOpen={handleSetIsOpen}
      ></BurgerMenu>
    </header>
  );
};
