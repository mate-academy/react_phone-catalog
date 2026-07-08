//hooks
import { useContext, useState } from 'react';

//style
import styles from './Navbar.module.scss';

//react-router
import { Link, NavLink } from 'react-router-dom';

//assets
import logo from '../../assets/logos/Logo.svg';
import menuIcon from './assets/icons/Union.svg';
import favouriteIcon from './assets/icons/Favourites (Heart Like).svg';
import cartIcon from './assets/icons/Shopping bag (Cart).svg';
import closeIcon from './assets/icons/Close.svg';

//services
import classNames from 'classnames';
import { CartContext } from '../../services/CartContext';
import { FavouritesContext } from '../../services/FavouritesContext';

export const NavBar = () => {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

  const cart = useContext(CartContext)!.cart;
  const fav = useContext(FavouritesContext)!.favourites;

  const closeMenu = () => setMenuIsOpen(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.pannel}>
        <Link to="/" onClick={closeMenu} className={styles['logo-link']}>
          <img src={logo} alt="Nice Gadgets" className={styles['logo-img']} />
        </Link>

        <div className={styles.tabs}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              classNames(styles['nav-link'], {
                [styles['nav-link--selected']]: isActive,
              })
            }
          >
            home
          </NavLink>

          <NavLink
            to="/phones"
            className={({ isActive }) =>
              classNames(styles['nav-link'], {
                [styles['nav-link--selected']]: isActive,
              })
            }
          >
            phones
          </NavLink>

          <NavLink
            to="/tablets"
            className={({ isActive }) =>
              classNames(styles['nav-link'], {
                [styles['nav-link--selected']]: isActive,
              })
            }
          >
            tablets
          </NavLink>

          <NavLink
            to="/accessories"
            className={({ isActive }) =>
              classNames(styles['nav-link'], {
                [styles['nav-link--selected']]: isActive,
              })
            }
          >
            accessories
          </NavLink>
        </div>

        <div className={styles['client-section']}>
          <NavLink
            to="/favourites"
            className={({ isActive }) =>
              classNames(styles['client-button'], {
                [styles['client-button--selected']]: isActive,
              })
            }
          >
            <div className={styles['client-icon']}>
              {fav.length > 0 && (
                <div className={styles.counter}>
                  <p>{fav.length}</p>
                </div>
              )}
              <img src={favouriteIcon} alt="favourites" />
            </div>
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              classNames(styles['client-button'], {
                [styles['client-button--selected']]: isActive,
              })
            }
          >
            <div className={styles['client-icon']}>
              {cart.length > 0 && (
                <div className={styles.counter}>
                  <p>{cart.length}</p>
                </div>
              )}
              <img src={cartIcon} alt="cart" />
            </div>
          </NavLink>
        </div>

        <button
          onClick={() => setMenuIsOpen(!menuIsOpen)}
          className={styles['menu-button']}
        >
          <img
            src={menuIsOpen ? closeIcon : menuIcon}
            alt="Menu"
            className={styles['menu-icon']}
          />
        </button>
      </div>

      <div className={`${styles.menu} ${menuIsOpen ? styles.open : ''}`}>
        <div className={styles.menuList}>
          <Link to="/" onClick={closeMenu}>
            home
          </Link>

          <Link to="/phones" onClick={closeMenu}>
            phones
          </Link>

          <Link to="/tablets" onClick={closeMenu}>
            tablets
          </Link>

          <Link to="/accessories" onClick={closeMenu}>
            accessories
          </Link>
        </div>

        <div className={styles.menuClient}>
          <Link to="/favourites" onClick={closeMenu}>
            <img src={favouriteIcon} alt="" />
          </Link>

          <Link to="/cart" onClick={closeMenu}>
            <img src={cartIcon} alt="" />
          </Link>
        </div>
      </div>
    </nav>
  );
};
