import { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { BASE_URL } from '../../utils/const';
import styles from './Header.module.scss';
import classNames from 'classnames';
import { OverlayMenu } from '../OverlayMenu';
import { ProductContext } from '../../context/ProductContext';

const classActiveNavLink = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.link, {
    [styles.activeLink]: isActive,
  });

export const classActiveIcon = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.navLink, {
    [styles.activeIcon]: isActive,
  });

const Header = () => {
  const { cart, favorites } = useContext(ProductContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpenMenu = () => setIsOpen(current => !current);

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
          <NavLink to="/favorites" className={classActiveIcon}>
            <img src={`${BASE_URL}/icons/Favorites.svg`} alt="Favorites" />
            {favorites.length > 0 && (
              <span className={styles.count}>
                <p className={styles.countText}>{favorites.length}</p>
              </span>
            )}
          </NavLink>
          <NavLink to="/cart" className={classActiveIcon}>
            <img src={`${BASE_URL}/icons/Cart.svg`} alt="Cart" />
            {cart.length > 0 && (
              <span className={styles.count}>
                <p className={styles.countText}>{cart.length}</p>
              </span>
            )}
          </NavLink>
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

      {isOpen && <OverlayMenu setOpen={setIsOpen} />}
    </>
  );
};

export default Header;
