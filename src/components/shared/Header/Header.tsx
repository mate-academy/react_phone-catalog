import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { useState } from 'react';
import './Header.scss';

export const Header = () => {
  const [isMenuActive, setMenuActive] = useState(false);
  const [canTransform, setCanTransform] = useState(false);

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
    <div className={classNames('top')}>
      <div className="mobile-header top__mobile-header">
        <div className="logo mobile-header__logo"></div>
        <div
          className={classNames('burger', 'mobile-header__burger', {
            'burger--hidden': isMenuActive,
            'burger--visible': !isMenuActive,
          })}
          onClick={toggleBurgerMenu}
        ></div>
      </div>

      <div
        className={classNames('menu', 'top__menu', {
          'menu--active': isMenuActive,
          'menu--transform' : canTransform,
        })}
      >
        <nav className={classNames('nav', 'menu__nav')}>
          <NavLink to="#" className="nav__item">
            home
          </NavLink>
          <NavLink to="#" className="nav__item">
            phones
          </NavLink>
          <NavLink to="#" className="nav__item">
            tablets
          </NavLink>
          <NavLink to="#" className="nav__item">
            accessories
          </NavLink>
        </nav>
        <div className={classNames('choice', 'menu__choice')}>
          <div className="choice__item choice__item--favorite"></div>
          <div className="choice__item choice__item--shopping-cart"></div>
        </div>
      </div>
    </div>
  );
};
