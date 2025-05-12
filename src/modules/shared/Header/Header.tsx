import { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';

import styles from './Header.module.scss';
import classNames from 'classnames';
import { useGlobalState } from '../../../context/store';
import { LINKS } from '../../../variables/navLinks';
import { BurgerMenu } from '../BurgerMenu';

const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.navLink, { [styles.navLinkActive]: isActive });

const getIconLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.iconLink, { [styles.iconLinkActive]: isActive });

export const Header: FC = () => {
  const { toggleMenu, carts, favourites } = useGlobalState();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/" className={styles.logoLink}>
          <img src="../../../../../public/img/icons/logo-icon.svg" alt="logo" />
        </Link>
      </div>

      <button onClick={toggleMenu} className={styles.iconBurger}></button>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {LINKS.map(link => (
            <li key={link.title} className={styles.navListItem}>
              <NavLink to={link.path} className={getNavLinkClass}>
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.iconsWrapper}>
        <div className={styles.icon}>
          <NavLink to="/favourites" className={getIconLinkClass}></NavLink>

          {favourites.length > 0 && (
            <span className={styles.itemsAmount}></span>
          )}
        </div>

        <div className={styles.icon}>
          <NavLink to="/carts" className={getIconLinkClass}></NavLink>

          {carts.length > 0 && <span className={styles.itemsAmount}></span>}
        </div>
      </div>

      <BurgerMenu />
    </header>
  );
};
