import styles from './Header.module.scss';
import classNames from 'classnames';
import { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CartContext, FavoritesContext } from '../../contexts';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.navBtn, { [styles.isActiveMenu]: isActive });

const getLinkClassCart = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.iconLink, styles.cart, { [styles.isActiveCart]: isActive });

const getLinkClassFavorites = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.iconLink, styles.favorites, {
    [styles.isActiveFavorites]: isActive,
  });

const getLinkClassMobile = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.navBtnMobile, { [styles.isActiveMenuMobile]: isActive });

const getLinkClassCartMobile = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.iconBoxMobile, {
    [styles.isActiveCartMobile]: isActive,
  });

const getLinkClassFavoritesMobile = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.iconBoxMobile, {
    [styles.isActiveFavoritesMobile]: isActive,
  });

export const Header = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const { cartItems } = useContext(CartContext);
  const { favoritesItems } = useContext(FavoritesContext);

  const totalInCart = cartItems.length;
  const totalFavorites = favoritesItems.length;

  return (
    <>
      <header className={styles.header}>
        <div className={styles.menu}>
          <Link to="/" className={styles.logoLink}>
            <img src="./img/Logo.svg" alt="Nice Gadgets logo" />
          </Link>

          <nav className={styles.nav}>
            <NavLink to="/" className={getLinkClass}>
              home
            </NavLink>
            <NavLink to="/phones" className={getLinkClass}>
              phones
            </NavLink>
            <NavLink to="/tablets" className={getLinkClass}>
              tablets
            </NavLink>
            <NavLink to="/accessories" className={getLinkClass}>
              accessories
            </NavLink>
          </nav>
        </div>

        <div className={styles.icons}>
          <div className={styles.iconBox}>
            <NavLink
              to="/favorites"
              className={getLinkClassFavorites}
            ></NavLink>
            {totalFavorites > 0 && (
              <div className={styles.favoritesCounter}>{totalFavorites} </div>
            )}
          </div>

          <div className={styles.iconBox}>
            <NavLink to="/cart" className={getLinkClassCart}></NavLink>
            {totalInCart > 0 && (
              <div className={styles.cartCounter}>{totalInCart} </div>
            )}
          </div>
        </div>

        <div
          className={`${styles.iconBox} ${styles.mobileMenu}`}
          onClick={() => setMenuIsOpen(!menuIsOpen)}
        >
          <div
            className={classNames(styles.iconMobileMenu, {
              [styles.openMenu]: menuIsOpen,
            })}
          ></div>
        </div>

        {menuIsOpen && (
          <div className={styles.mobileMenuOpen}>
            <div className={styles.mobileNav}>
              {' '}
              <NavLink to="/" className={getLinkClassMobile}>
                HOME
              </NavLink>
              <NavLink to="/phones" className={getLinkClassMobile}>
                PHONES
              </NavLink>
              <NavLink to="/tablets" className={getLinkClassMobile}>
                TABLETS
              </NavLink>
              <NavLink to="/accessories" className={getLinkClassMobile}>
                ACCESSORIES
              </NavLink>
            </div>

            <div className={styles.iconsMobile}>
              <NavLink to="/favorites" className={getLinkClassFavoritesMobile}>
                <div
                  className={`${styles.iconLinkMobile} ${styles.favoritesMobile}`}
                ></div>
                {totalFavorites > 0 && (
                  <div className={styles.favoritesCounterMobile}>
                    {totalFavorites}{' '}
                  </div>
                )}
              </NavLink>

              <NavLink to="/cart" className={getLinkClassCartMobile}>
                <div
                  className={`${styles.iconLinkMobile} ${styles.cartMobile}`}
                ></div>
                {totalInCart > 0 && (
                  <div className={styles.cartCounterMobile}>{totalInCart} </div>
                )}
              </NavLink>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
