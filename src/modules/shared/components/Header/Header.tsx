import styles from './Header.module.scss';
import logo from './../../../../../public/img/logo.svg';
import favourites from './../../../../../public/img/favourites.svg';
import cart from './../../../../../public/img/cart.svg';
import { navLinks } from './constants';
import { Link, NavLink, NavLinkRenderProps } from 'react-router-dom';
import classNames from 'classnames';

export const Header = () => {
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
            <NavLink to="/favourites" className={styles.favourites}>
              <img src={favourites} alt="favourites" />
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
