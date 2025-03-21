import React from 'react';
import style from './Header.module.scss';
import headerLogo from '@/shared/icons/logo.png';
import favoriteIcon from '@/shared/icons/favourites-heart-like.svg';
import cartBagIcon from '@/shared/icons/shopping-bag-cart.svg';
import burgerMenuIcon from '@/shared/icons/menu.svg';
import closeIcon from '@/shared/icons/close.svg';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';

export const Header: React.FC = () => {
  const cartContext = useCart();

  if (!cartContext) {
    return 'CartContext is not loading';
  }

  const { cart, favourite, setIsOpenMenu, isOpenMenu } = cartContext;

  console.log(isOpenMenu);

  const location = useLocation();

  const navigate = useNavigate();

  return (
    <header className={style.header}>
      <div className={style.wrapper}>
        <Link to="/" className={style.logo}>
          <img src={headerLogo} alt="Header logo" className={style.logoIcon} />
        </Link>

        <nav className={style.nav}>
          <ul className={style.list}>
            <li className={style.item}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? `${style.active} ${style.link}` : `${style.link}`
                }
              >
                Home
              </NavLink>
            </li>

            <li className={style.item}>
              <NavLink
                to="/phones"
                className={({ isActive }) =>
                  isActive ? `${style.active} ${style.link}` : `${style.link}`
                }
              >
                Phones
              </NavLink>
            </li>

            <li className={style.item}>
              <NavLink
                to="/tablets"
                className={({ isActive }) =>
                  isActive ? `${style.active} ${style.link}` : `${style.link}`
                }
              >
                Tablets
              </NavLink>
            </li>

            <li className={style.item}>
              <NavLink
                to="/accessories"
                className={({ isActive }) =>
                  isActive ? `${style.active} ${style.link}` : `${style.link}`
                }
              >
                Accessories
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className={style.options}>
          <NavLink
            to="/favourite"
            className={({ isActive }) =>
              isActive ? `${style.active} ${style.favourite}` : `${style.favourite}`
            }
          >
            <div className={style.containerIcon}>
              <img src={favoriteIcon} alt="favourite icon" className={style.icon} />
              {favourite.length > 0 && (
                <span className={style.countProduct}>{favourite.length}</span>
              )}
            </div>
          </NavLink>

          <NavLink
            to="/bag"
            className={({ isActive }) =>
              isActive ? `${style.active} ${style.bag}` : `${style.bag}`
            }
          >
            <div className={style.containerIcon}>
              <img src={cartBagIcon} alt="bag icon" className={style.icon} />
              {cart.length > 0 && <span className={style.countProduct}>{cart.length}</span>}
            </div>
          </NavLink>

          {location.pathname === '/menu' ? (
            <NavLink
              to=""
              onClick={() => {
                navigate(-1);
                setIsOpenMenu(false);
              }}
              className={style.burgerMenu}
            >
              <img src={closeIcon} alt="burger menu icon" className={style.icon} />
            </NavLink>
          ) : (
            <NavLink
              to="/menu"
              className={style.burgerMenu}
              onClick={() => setIsOpenMenu(true)}
            >
              <img src={burgerMenuIcon} alt="burger menu icon" className={style.icon} />
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
};
