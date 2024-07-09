import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { Menu } from '../Menu';
import { StateContext } from '../../Store';

const classActiveNavLink = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.link, {
    [styles.activeLink]: isActive,
  });

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const state = useContext(StateContext);
  const { favorites, bascket } = state;

  let totalQuantity = 0;

  for (const item of bascket) {
    totalQuantity += item.quantity;
  }

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
            {favorites.length !== 0 && (
              <span className={styles.counter}>{favorites.length}</span>
            )}
          </div>
          <div className={styles.iconMenu}>
            <Link to="/card">
              <div className={styles.actionIcon}>
                <img src="img/ShoppingBag_header.svg" alt="Favorites" />
              </div>
            </Link>
            {bascket.length !== 0 && (
              <span className={styles.counter}>{totalQuantity}</span>
            )}
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
