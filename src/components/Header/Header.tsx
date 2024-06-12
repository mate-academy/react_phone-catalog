import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { BASE_URL } from '../../utils/const';
import styles from './Header.module.scss';
import classNames from 'classnames';
import { OverlayMenu } from '../OverlayMenu';
import { ProductContext } from '../../context/ProductContext';

interface Props {
  isOpen: boolean;
  toggleOpenMenu: () => void;
}

export const classActiveNavLink = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.link, {
    [styles.activeLink]: isActive,
  });

const Header: React.FC<Props> = ({ isOpen, toggleOpenMenu }) => {
  const { cart, favorites } = useContext(ProductContext);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.content}>
          <Link to="/" className={styles.logoLink}>
            <img
              src={`${BASE_URL}/img/Logo.png`}
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
                <img src={`${BASE_URL}/icons/Favorites.svg`} alt="Favorites" />
                {favorites.length > 0 && (
                  <span className={styles.count}>
                    <p className={styles.countText}>{favorites.length}</p>
                  </span>
                )}
              </div>
            </Link>
          </div>
          <div className={styles.iconMenu}>
            <Link to="/cart">
              <div className={styles.actionIcon}>
                <img src={`${BASE_URL}/icons/Cart.svg`} alt="Favorites" />
                {cart.length > 0 && (
                  <span className={styles.count}>
                    <p className={styles.countText}>{cart.length}</p>
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>

        <div className={styles.menuBlock}>
          <button className={styles.menuButton} onClick={toggleOpenMenu}>
            <img
              src={
                isOpen
                  ? `${BASE_URL}/icons/Close.svg`
                  : `${BASE_URL}/icons/Burger.svg`
              }
              alt="Menu"
              className={styles.burger}
            />
          </button>
        </div>
      </header>

      {isOpen && <OverlayMenu />}
    </>
  );
};

export default Header;
