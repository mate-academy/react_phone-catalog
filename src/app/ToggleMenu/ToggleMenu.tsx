import { NavLink } from 'react-router-dom';
import style from './ToggleMenu.module.scss';
import { useAppSelector } from '../hooks';
import { useEffect } from 'react';
import classNames from 'classnames';

export const ToggleMenu = () => {
  const cartItems = useAppSelector(state => state.cart?.items) || [];
  const favoriteItems = useAppSelector(state => state.favorites?.items) || [];

  const totalCartCount = cartItems.reduce(
    (total, item) => total + (item.quantity || 1),
    0,
  );
  const totalFavoritesCount = favoriteItems.length;

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className={style.mobileMenu}>
      <ul className={style.mobileMenu__list}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              classNames(style.mobileMenu__link, {
                [style['is-active']]: isActive,
              })
            }
          >
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/phones"
            className={({ isActive }) =>
              classNames(style.mobileMenu__link, {
                [style['is-active']]: isActive,
              })
            }
          >
            PHONES
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/tablets"
            className={({ isActive }) =>
              classNames(style.mobileMenu__link, {
                [style['is-active']]: isActive,
              })
            }
          >
            TABLETS
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/accessories"
            className={({ isActive }) =>
              classNames(style.mobileMenu__link, {
                [style['is-active']]: isActive,
              })
            }
          >
            ACCESSORIES
          </NavLink>
        </li>
      </ul>

      <div className={style.mobileMenu__bottom}>
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            classNames(style.mobileMenu__bottomLink, {
              [style['is-active']]: isActive,
            })
          }
        >
          <div className={style.nav__icon_wrapper}>
            <div className={style.iconContainer}>
              <img
                src="img/icons/favourites.svg"
                alt="Favorites"
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
            classNames(style.mobileMenu__bottomLink, {
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
    </div>
  );
};
