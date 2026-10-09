import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';
import style from './Header.module.scss';
import { useAppSelector } from '../../../app/hooks';
import { useEffect, useState } from 'react';
import { ToggleMenu } from '../../../app/ToggleMenu/ToggleMenu';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const cartItems = useAppSelector(state => state.cart.items) || [];
  const favoriteItems = useAppSelector(state => state.favorites.items) || [];

  const totalCartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const totalFavoritesCount = favoriteItems.length;

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className={style.header}>
      <nav className={style.nav}>
        <div className={style.nav__left}>
          <NavLink to="/" className={style.nav__logo}>
            <img
              src="img/icons/logo.svg"
              alt="logo"
              className={style.nav__logo__img}
            />
          </NavLink>

          <ul className={style.nav__list}>
            <li className={style.nav__item}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  classNames(style.nav__link, 'uppercase', {
                    [style['is-active']]: isActive,
                  })
                }
              >
                HOME
              </NavLink>
            </li>
            <li className={style.nav__item}>
              <NavLink
                to="/phones"
                className={({ isActive }) =>
                  classNames(style.nav__link, 'uppercase', {
                    [style['is-active']]: isActive,
                  })
                }
              >
                PHONES
              </NavLink>
            </li>
            <li className={style.nav__item}>
              <NavLink
                to="/tablets"
                className={({ isActive }) =>
                  classNames(style.nav__link, 'uppercase', {
                    [style['is-active']]: isActive,
                  })
                }
              >
                TABLETS
              </NavLink>
            </li>
            <li className={style.nav__item}>
              <NavLink
                to="/accessories"
                className={({ isActive }) =>
                  classNames(style.nav__link, 'uppercase', {
                    [style['is-active']]: isActive,
                  })
                }
              >
                ACCESSORIES
              </NavLink>
            </li>
          </ul>
        </div>

        <div className={style.nav__right}>
          <div className={style['nav__desktop-only']}>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                classNames(style.nav__link, style['nav__link--icon'], {
                  [style['is-active']]: isActive,
                })
              }
            >
              <div className={style.nav__icon_wrapper}>
                <div className={style.iconContainer}>
                  <img
                    src="img/icons/favourites.svg"
                    alt="Nice Gadgets logo"
                    className={style.iconContainer__img}
                  />
                  {totalFavoritesCount > 0 && (
                    <span className={style.badge}>{totalFavoritesCount}</span>
                  )}
                </div>
              </div>
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                classNames(style.nav__link, style['nav__link--icon'], {
                  [style['is-active']]: isActive,
                })
              }
            >
              <div className={style.nav__icon_wrapper}>
                <div className={style.iconContainer}>
                  <img
                    src="img/icons/cart.svg"
                    alt="Cart"
                    className={style.iconContainer__img}
                  />
                  {totalCartCount > 0 && (
                    <span className={style.badge}>{totalCartCount}</span>
                  )}
                </div>
              </div>
            </NavLink>
          </div>

          <button
            type="button"
            className={classNames(
              style.nav__link,
              style['nav__link--icon'],
              style['nav__menu-btn'],
            )}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className={style.nav__icon_wrapper}>
              <img
                src={isMenuOpen ? 'img/icons/close.svg' : 'img/icons/menu.svg'}
                alt="menu"
              />
            </div>
          </button>
        </div>
      </nav>
      {isMenuOpen && <ToggleMenu />}
    </header>
  );
};
