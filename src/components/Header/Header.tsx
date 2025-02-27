import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { useGlobalState } from '../../hooks/hooks';
import { getActiveClass } from '../../services/activeClassHelper';
import { Logo } from '../Logo';
import './Header.scss';

export const Header = () => {
  const { cart, favourites, categories } = useGlobalState();
  const [isMenu, setIsMenu] = useState(false);

  const getMenuClass = (baseClass: string) => {
    return classNames(baseClass, {
      [`${baseClass}--menu`]: isMenu,
    });
  };

  const closeMenu = () => setIsMenu(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsMenu(false);
      }
    };

    if (isMenu) {
      window.addEventListener('resize', handleResize);
    }

    return () => window.removeEventListener('resize', handleResize);
  }, [isMenu]);

  return (
    <header className={getMenuClass('header')}>
      <Logo logoClass="header" />

      <nav className={getMenuClass('header__nav')}>
        <ul className={getMenuClass('header__list')}>
          <li className="header__item">
            <NavLink
              to="/"
              className={getActiveClass('header__link')}
              onClick={closeMenu}
            >
              home
            </NavLink>
          </li>
          {categories.map(category => (
            <li className="header__item" key={category.name}>
              <NavLink
                to={`/${category.name}`}
                className={getActiveClass('header__link')}
                onClick={closeMenu}
              >
                {category.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div
        onClick={() => {
          setIsMenu(!isMenu);
        }}
        className={getMenuClass('header__menu')}
      ></div>

      <div className={getMenuClass('header__icons')}>
        <NavLink
          to="/favourites"
          className={getActiveClass('header__icon-link')}
          onClick={closeMenu}
        >
          <div
            className={classNames('header__icon header__icon--heart', {
              'header__icon--count-heart': favourites.length > 0,
            })}
            data-fav={favourites.length}
          ></div>
        </NavLink>
        <NavLink
          to="/cart"
          className={getActiveClass('header__icon-link')}
          onClick={closeMenu}
        >
          <div
            className={classNames('header__icon header__icon--cart', {
              'header__icon--count-cart': cart.length > 0,
            })}
            data-cart={cart.reduce((sum, product) => product.quantity + sum, 0)}
          ></div>
        </NavLink>
      </div>
    </header>
  );
};
