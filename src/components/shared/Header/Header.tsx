import { NavLink, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useContext, useState } from 'react';
import './Header.style.scss';

import burger from '../../../../public/icons/menu.svg';
import closeIcon from '../../../../public/icons/close.svg';
import favIcon from '../../../../public/icons/favourites.svg';
import cart from '../../../../public/icons/shopping-cart.svg';
import { routes } from '../Routs/Routs';
import { Categories } from '../../../types/Categories';
import { LocalStorageContext } from '../../../app/Contexts/LocalStorageContext';

export const Header = () => {
  const { favItems, cartItems } = useContext(LocalStorageContext);
  const [isMenuActive, setMenuActive] = useState(false);
  const [canTransform, setCanTransform] = useState(false);
  const navigate = useNavigate();

  const toggleBurgerMenu = () => {
    if (isMenuActive) {
      setCanTransform(false);
      // eslint-disable-next-line no-undef
      setTimeout(() => {
        setMenuActive(false);
      }, 100);
    } else {
      setMenuActive(true);
      // eslint-disable-next-line no-undef
      setTimeout(() => {
        setCanTransform(true);
      }, 1);
    }
  };

  return (
    <div className={classNames('top', { 'top--full-screen': isMenuActive })}>
      <div className="mobile-header top__mobile-header">
        <div
          className="logo mobile-header__logo"
          onClick={() => navigate(routes.home)}
        ></div>
        <div
          className="burger mobile-header__burger"
          onClick={toggleBurgerMenu}
        >
          <img
            className="burger-icon"
            src={isMenuActive ? closeIcon : burger}
            alt="menu"
          />
        </div>
      </div>

      <div
        className={classNames('menu', 'top__menu', {
          'menu--active': isMenuActive,
          'menu--transform': canTransform,
        })}
      >
        <nav className={classNames('nav', 'menu__nav')}>
          {Object.keys(Categories).map(key => (
            <NavLink to={routes[key]} key={key} className="nav__item">
              {key}
            </NavLink>
          ))}
        </nav>

        <div className={classNames('choice', 'menu__choice')}>
          <div
            className="choice__icon choice__icon--favorite"
            onClick={() => navigate(routes.fav)}
          >
            {favItems.length > 0 && (
              <div className="choice__icon__number">
                <p>{favItems.length}</p>
              </div>
            )}
            <img className="icon" src={favIcon} />
          </div>
          <div
            className="choice__icon choice__icon--shopping-cart"
            onClick={() => navigate(routes.cart)}
          >
            {cartItems.length > 0 && (
              <div className="choice__icon__number">
                <p>{cartItems.length}</p>
              </div>
            )}
            <img className="icon" src={cart} />
          </div>
        </div>
      </div>
    </div>
  );
};
