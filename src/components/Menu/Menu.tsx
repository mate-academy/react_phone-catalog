import React from 'react';
import style from './Menu.module.scss';
import { NavLink } from 'react-router-dom';
import favoriteIcon from '@/shared/icons/favourites-heart-like.svg';
import cartBagIcon from '@/shared/icons/shopping-bag-cart.svg';
import { useCart } from '@/hooks/useCart';

export const Menu: React.FC = () => {
  const cartContext = useCart();

  if (!cartContext) {
    return 'CartContext is not loading';
  }

  const { cart, favourite, isOpenMenu } = cartContext;

  console.log(isOpenMenu);

  return (
    <div className={`${style.content} ${isOpenMenu ? `${style.isOpen}` : ''}`}>
      <div className={style.navigation}>
        <ul className={style.navList}>
          <li className={style.navItem}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${style.isActiveLink}` : `${style.navLink}`
              }
            >
              Home
            </NavLink>
          </li>

          <li className={style.navItem}>
            <NavLink
              to="/phones"
              className={({ isActive }) =>
                isActive ? `${style.isActiveLink}` : `${style.navLink}`
              }
            >
              Phones
            </NavLink>
          </li>

          <li className={style.navItem}>
            <NavLink
              to="/tablets"
              className={({ isActive }) =>
                isActive ? `${style.isActiveLink}` : `${style.navLink}`
              }
            >
              Tablets
            </NavLink>
          </li>

          <li className={style.navItem}>
            <NavLink
              to="/accessories"
              className={({ isActive }) =>
                isActive ? `${style.isActiveLink}` : `${style.navLink}`
              }
            >
              Accessories
            </NavLink>
          </li>
        </ul>
      </div>

      <div className={style.userInetrface}>
        <NavLink
          to="/favourite"
          className={({ isActive }) =>
            isActive ? `${style.active} ${style.UIfavorite}` : `${style.UIfavorite}`
          }
        >
          <div className={style.containerIcon}>
            <img src={favoriteIcon} alt="favourite icon" className={style.icon} />
            {favourite.length > 0 && <span className={style.countProduct}>{favourite.length}</span>}
          </div>
        </NavLink>

        <NavLink
          to="/bag"
          className={({ isActive }) =>
            isActive ? `${style.active} ${style.UIshopBag}` : `${style.UIshopBag}`
          }
        >
          <div className={style.containerIcon}>
            <img src={cartBagIcon} alt="bag icon" className={style.icon} />
            {cart.length > 0 && <span className={style.countProduct}>{cart.length}</span>}
          </div>
        </NavLink>
      </div>
    </div>
  );
};
