import style from './Header.module.scss';
import { NavLink } from 'react-router-dom';

export const Header = () => {

  return (
    <header className={style.header}>
      <div className={style.header__container}>

        <NavLink to="/" className={style.header__logo}>
          <img
            src="./img/logo/Logo.svg"
            alt="logo"
            className={style.header__logo__image}
          />
        </NavLink>

        <nav className={style.header__nav}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${style.header__nav__link} ${isActive ? `${style[`is-active`]}` : ''}`
            }
          >
            home
          </NavLink>
          <NavLink
            to="/phones"
            className={({ isActive }) =>
              `${style.header__nav__link} ${isActive ? `${style[`is-active`]}` : ''}`
            }
          >
            phones
          </NavLink>
          <NavLink
            to="/tablets"
            className={({ isActive }) =>
              `${style.header__nav__link} ${isActive ? `${style[`is-active`]}` : ''}`
            }
          >
            tablets
          </NavLink>
          <NavLink
            to="/accessories"
            className={({ isActive }) =>
              `${style.header__nav__link} ${isActive ? `${style[`is-active`]}` : ''}`
            }
          >
            accessories
          </NavLink>
        </nav>

        <div className={style.header__icons}>
          <NavLink to="/favourites" className={style[`header__icons--favourites`]} />
          <NavLink to="/cart" className={style[`header__icons--bag`]} />
        </div>
      </div>
    </header>
  );
};
