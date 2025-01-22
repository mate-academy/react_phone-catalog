import { Link, NavLink } from 'react-router-dom';
import style from './NavBar.module.scss';
import { useState } from 'react';
import { CartIcon } from './components/CartIcon/CartIcon';
import { FavouriteIcon } from './components/FavouriteIcon/FavouriteIcon';

export const NavBar = () => {
  const [burgerOpened, setBurgerOpened] = useState(false);

  const showBurger = () => {
    setBurgerOpened(!burgerOpened);
  };

  return (
    <>
      <header className={style.nav}>
        <Link to="/">
          <img
            src={`${process.env.PUBLIC_URL}/img/Logo.png`}
            alt="logo"
            className={style.nav__logo}
          />
        </Link>
        <nav className={style.nav__container}>
          <div className={style.nav__items}>
            <NavLink
              to="/"
              id="home"
              className={({ isActive }) =>
                `${style.nav__item} ${isActive ? style['nav__item--active'] : ''}`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="phones"
              className={({ isActive }) =>
                `${style.nav__item} ${isActive ? style['nav__item--active'] : ''}`
              }
            >
              Phones
            </NavLink>

            <NavLink
              to="tablets"
              className={({ isActive }) =>
                `${style.nav__item} ${isActive ? style['nav__item--active'] : ''}`
              }
            >
              Tablets
            </NavLink>

            <NavLink
              to="accessories"
              className={({ isActive }) =>
                `${style.nav__item} ${isActive ? style['nav__item--active'] : ''}`
              }
            >
              Accessories
            </NavLink>
          </div>
          <div className={style.nav__buttons}>
            <NavLink
              to="favourite"
              className={({ isActive }) =>
                `${style.nav__button} ${style['nav__button--favourite']} ${isActive ? style['nav__item--active'] : ''}`
              }
            >
              <FavouriteIcon />
            </NavLink>
            <NavLink
              to="cart"
              className={({ isActive }) =>
                `${style.nav__button} ${style['nav__button--cart']} ${isActive ? style['nav__item--active'] : ''}`
              }
            >
              <CartIcon />
            </NavLink>

            <button
              className={`${style.nav__burger_menu} ${!burgerOpened ? style.nav__burger_menu_close : ''}`}
              onClick={showBurger}
            />
          </div>
        </nav>
      </header>

      {burgerOpened && (
        <div
          className={`${style.burger} ${burgerOpened ? style['burger--open'] : ''}`}
          onClick={() => setBurgerOpened(false)}
        >
          <div className={style.burger__items}>
            <NavLink
              to="/"
              id="home"
              className={({ isActive }) =>
                `${style.burger__item} ${isActive ? style['burger__item--active'] : ''}`
              }
              onClick={showBurger}
            >
              Home
            </NavLink>

            <NavLink
              to="phones"
              className={({ isActive }) =>
                `${style.burger__item} ${isActive ? style['burger__item--active'] : ''}`
              }
              onClick={showBurger}
            >
              Phones
            </NavLink>

            <NavLink
              to="tablets"
              className={({ isActive }) =>
                `${style.burger__item} ${isActive ? style['burger__item--active'] : ''}`
              }
              onClick={showBurger}
            >
              Tablets
            </NavLink>

            <NavLink
              to="accessories"
              className={({ isActive }) =>
                `${style.burger__item} ${isActive ? style['burger__item--active'] : ''}`
              }
              onClick={showBurger}
            >
              Accessories
            </NavLink>
          </div>
          <div className={style.burger__buttons}>
            <NavLink
              to="favourite"
              className={({ isActive }) =>
                `${style.burger__button} ${style['burger__button--favourite']} ${isActive ? style['nav__item--active'] : ''}`
              }
            >
              <FavouriteIcon />
            </NavLink>
            <NavLink
              to="cart"
              className={({ isActive }) =>
                `${style.burger__button} ${style['burger__button--cart']} ${isActive ? style['nav__item--active'] : ''}`
              }
            >
              <CartIcon />
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
};
