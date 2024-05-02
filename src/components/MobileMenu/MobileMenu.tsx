import classNames from 'classnames';
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './MobileMenu.scss';
import { useMenuContext } from '../MenuContext';
import { useDeviceContext } from '../DeviceContext/DeviceContext';
import { useTranslation } from 'react-i18next';

export const MobileMenu: React.FC = () => {
  const { isMenuOpen, setIsMenuOpen } = useMenuContext();
  const { shoppingCart, favourites, cartLength } = useDeviceContext();
  const { t } = useTranslation();

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <div
      className={classNames('navbar__mobile', {
        'navbar__mobile--open': isMenuOpen,
      })}
    >
      <div className="navbar__mobile--menu">
        <div className="navbar__logo">
          <Link
            to="home"
            onClick={handleMenuClose}
            className="icon icon--logo"
          />
        </div>

        <button
          className="navbar__button icon icon--close"
          onClick={handleMenuClose}
        />
      </div>
      <div className="navbar__mobile--list">
        <NavLink
          to={'/'}
          onClick={handleMenuClose}
          className={({ isActive }) =>
            classNames(
              'navbar__menu--link navbar__menu--link--mobile uppercase',
              {
                'active active-mobile': isActive,
              },
            )
          }
        >
          {t('Home')}
        </NavLink>
        <NavLink
          to={'/products/phones'}
          onClick={handleMenuClose}
          className={({ isActive }) =>
            classNames(
              'navbar__menu--link navbar__menu--link--mobile uppercase',
              {
                'active active-mobile': isActive,
              },
            )
          }
        >
          {t('Phones')}
        </NavLink>
        <NavLink
          to={'/products/tablets'}
          onClick={handleMenuClose}
          className={({ isActive }) =>
            classNames(
              'navbar__menu--link navbar__menu--link--mobile uppercase',
              {
                'active active-mobile': isActive,
              },
            )
          }
        >
          {t('Tablets')}
        </NavLink>
        <NavLink
          to={'/products/accessories'}
          onClick={handleMenuClose}
          className={({ isActive }) =>
            classNames(
              'navbar__menu--link navbar__menu--link--mobile uppercase',
              {
                'active active-mobile': isActive,
              },
            )
          }
        >
          {t('Accessories')}
        </NavLink>
      </div>
      <div className="navbar__mobile--buttons">
        <Link
          to="/favourites"
          className="navbar__button navbar__mobile--button"
          onClick={handleMenuClose}
        >
          <div className="icon icon--favourites">
            {!!favourites.length && (
              <div className="counter body-text">{favourites.length}</div>
            )}
          </div>
        </Link>
        <Link
          to="/cart"
          className="navbar__button navbar__mobile--button"
          onClick={handleMenuClose}
        >
          <div className="icon icon--cart">
            {!!shoppingCart.length && (
              <div className="counter body-text">{cartLength()}</div>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};
