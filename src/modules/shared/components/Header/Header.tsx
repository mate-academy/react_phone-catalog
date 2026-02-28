import styles from './Header.module.scss';
import logo from './../../../../../public/img/logo.svg';
import favorites from './../../../../../public/img/favourites.svg';
import cart from './../../../../../public/img/cart.svg';
import { navLinks } from './constants';
import { Link, NavLink, NavLinkRenderProps } from 'react-router-dom';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

export const Header = () => {
  const favoritesIds = useSelector(state => state.favorites);

  const isActiveLink = ({ isActive }: NavLinkRenderProps): string => {
    return classNames(
      `${styles.menu__link}`,
      `${isActive ? styles.active : ''}`,
    );
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="logo" />
        </Link>
        <nav className={styles.menu}>
          <ul className={styles.menu__items}>
            {navLinks.map(link => {
              return (
                <li key={link.id} className={styles.menu__item}>
                  <NavLink to={link.href} className={isActiveLink}>
                    {link.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className={styles.header__actions}>
          <span className={styles.actions__wrapper}>
            <NavLink
              data-count={favoritesIds.length}
              to="/favorites"
              className={favoritesIds.length > 0 ? styles.favorites : ''}
            >
              <img src={favorites} alt="favorites" />
            </NavLink>
          </span>
          <span className={styles.actions__wrapper}>
            <NavLink to="/cart" className={styles.cart}>
              <img src={cart} alt="cart" />
            </NavLink>
          </span>
        </div>
      </div>
    </header>
  );
};
