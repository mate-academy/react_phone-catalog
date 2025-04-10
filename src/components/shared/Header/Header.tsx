import './Header.style.scss';

import { Link, NavLink } from 'react-router-dom';
import { useContext, useRef, useState } from 'react';
import classNames from 'classnames';

import { routes } from '../Routs/Routs';
import { Categories } from '../../../types/Categories';
import { LocalStorageContext } from '../../../app/Contexts/LocalStorageContext';
import { calculateTotalQuantity } from '../../../utils/helpers';

import burger from '../../../../public/icons/menu.svg';
import closeIcon from '../../../../public/icons/close.svg';
import favIcon from '../../../../public/icons/favourites.svg';
import cart from '../../../../public/icons/shopping-cart.svg';
import { useScrollToTop } from '../../../utils/customHooks';


export const Header = () => {
  const { favItems, cartItems } = useContext(LocalStorageContext);
  const cartItemsQuantity = calculateTotalQuantity(cartItems);
  const [isMenuActive, setMenuActive] = useState(false);
  const [canTransform, setCanTransform] = useState(false);
  const bodyRef = useRef(document.body);

  const toggleBurgerMenu = () => {
    if (isMenuActive) {
      setCanTransform(false);
      setMenuActive(false);

      bodyRef.current.classList.remove('no-scroll');
    } else {
      setMenuActive(true);
      setCanTransform(true);

      bodyRef.current.classList.add('no-scroll');
    }
  };

  useScrollToTop();

  return (
    <div className={classNames('top')}>
      <div className="mobile-header top__mobile-header">
        <Link
          to={routes.home}
          className="logo mobile-header__logo"
        ></Link>
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
          <NavLink
            className="choice__icon choice__icon--favorite"
            to={routes.fav}
          >
            <div className="choice__icon__wrap">
              {favItems.length > 0 && (
                <div className="choice__icon__number__wrap">
                  <p className="choice__icon__number">{favItems.length}</p>
                </div>
              )}
              <img className="icon" src={favIcon} />
            </div>
          </NavLink>
          <NavLink
            className="choice__icon choice__icon--shopping-cart"
            to={routes.cart}
          >
            <div className="choice__icon__wrap">
              {cartItems.length > 0 && (
                <div className="choice__icon__number__wrap">
                  <p className="choice__icon__number">{cartItemsQuantity}</p>
                </div>
              )}
              <img className="icon" src={cart} />
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
