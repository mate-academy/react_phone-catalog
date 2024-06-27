import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import React, { useState } from 'react';
import classNames from 'classnames';
import { Menu } from '../Menu';

const classActiveNavLink = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.link, {
    [styles.activeLink]: isActive,
  });

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.content}>
          <Link to="/">
            <img
              src="/img/Logo_header_homePage.svg"
              alt="Logo"
              className={styles.logo}
            />
          </Link>

          <nav className={styles.nav}>
            <ul className={styles.list}>
              <li className={styles.pageLink}>
                <NavLink to="/" className={classActiveNavLink}>
                  home
                </NavLink>
              </li>
              <li className={styles.pageLink}>
                <NavLink to="/phones" className={classActiveNavLink}>
                  phones
                </NavLink>
              </li>
              <li className={styles.pageLink}>
                <NavLink to="/tablets" className={classActiveNavLink}>
                  tablets
                </NavLink>
              </li>
              <li className={styles.pageLink}>
                <NavLink to="/accessories" className={classActiveNavLink}>
                  accessories
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className={styles.icons}>
          <div className={styles.iconMenu}>
            <Link to="/favorites">
              <div className={styles.actionIcon}>
                <img src="img/HeartLike_Header_default.svg" alt="Favorites" />
              </div>
            </Link>
          </div>
          <div className={styles.iconMenu}>
            <Link to="/card">
              <div className={styles.actionIcon}>
                <img src="img/ShoppingBag_header.svg" alt="Favorites" />
              </div>
            </Link>
          </div>
        </div>
        <div className={styles.menuBlock}>
          <img
            src="img/Menu-burger-header.svg"
            alt="menu"
            className={styles.burger}
            onClick={() => setIsOpen(true)}
          />
        </div>
      </header>
      <Menu isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
