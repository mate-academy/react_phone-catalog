import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';

//#region svgs
import Logo from '../../icons/Logo.svg';
import Burger from '../../icons/Burger.svg';
import Cart from '../../icons/Cart.svg';
import Like from '../../icons/like.svg';
//#endregion

export function Header() {
  const nav = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.header__left}>
        <img
          className={styles.header__logo}
          src={Logo}
          alt="Logo"
          onClick={() => nav('/')}
        />
        <nav className={styles.header__nav}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? `${styles.header__nav__link} ${styles.active}`
                : styles.header__nav__link
            }
          >
            HOME
          </NavLink>
          <NavLink
            to="/Phones"
            className={({ isActive }) =>
              isActive
                ? `${styles.header__nav__link} ${styles.active}`
                : styles.header__nav__link
            }
          >
            PHONES
          </NavLink>
          <NavLink
            to="/Tablets"
            className={({ isActive }) =>
              isActive
                ? `${styles.header__nav__link} ${styles.active}`
                : styles.header__nav__link
            }
          >
            TABLETS
          </NavLink>
          <NavLink
            to="/Accessories"
            className={({ isActive }) =>
              isActive
                ? `${styles.header__nav__link} ${styles.active}`
                : styles.header__nav__link
            }
          >
            ACCESSORIES
          </NavLink>
        </nav>
      </div>
      <div className={styles.header__right}>
        <img className={styles.header__burger} src={Burger} alt="Burger" />
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            isActive
              ? `${styles.header__navlink} ${styles.active}`
              : styles.header__navlink
          }
        >
          <img className={styles.header__fav} src={Like} alt="Favorites" />
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive
              ? `${styles.header__navlink} ${styles.header__navlink__cart} ${styles.active}`
              : `${styles.header__navlink} ${styles.header__navlink__cart}`
          }
        >
          <img className={styles.header__cart} src={Cart} alt="Cart" />
        </NavLink>
      </div>
    </header>
  );
}
