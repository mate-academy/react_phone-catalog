import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import logo from '../../assets/icons/Logo.svg';
import favorites from '../../assets/icons/Favourites.svg';
import shoppingBag from '../../assets/icons/ShoppingBag.svg';
import { useState } from 'react';
import { MobileMenu } from './MobileMenu/MobileMenu';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { IconWithBadge } from '../icons/IconWithBadge';
import classNames from 'classnames';
import { cartItemsCount } from '../../features/utils/selectors';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.header__navLink, {
      [styles.header__navLinkActive]: isActive,
    });

  const getIconClass = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.header__iconLink, {
      [styles.header__iconLinkActive]: isActive,
    });

  const favoriteItems = useSelector(
    (state: RootState) => state.favorites.items,
  );

  const cartItems = useSelector(cartItemsCount);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__container}>
          <div className={styles.header__left}>
            <Link to="/" className={styles.header__logo}>
              <img src={logo} alt="Nice Gadgets" />
            </Link>

            <nav className={styles.header__nav}>
              <NavLink to="/" className={getNavClass}>
                HOME
              </NavLink>
              <NavLink to="/phones" className={getNavClass}>
                PHONES
              </NavLink>
              <NavLink to="/tablets" className={getNavClass}>
                TABLETS
              </NavLink>
              <NavLink to="/accessories" className={getNavClass}>
                ACCESSORIES
              </NavLink>
            </nav>
          </div>

          <div className={styles.header__right}>
            <NavLink to="/favorites" className={getIconClass}>
              <IconWithBadge
                icon={favorites}
                alt="favorites"
                badgeCount={favoriteItems.length}
              />
            </NavLink>
            <NavLink to="/cart" className={getIconClass}>
              <IconWithBadge
                icon={shoppingBag}
                alt="Shopping Bag"
                badgeCount={cartItems}
              />
            </NavLink>
          </div>
          <div className={styles.header__burgerContainer}>
            <button
              type="button"
              className={classNames(styles.header__burger, {
                [styles.header__burgerOpen]: isMenuOpen,
              })}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsMenuOpen(prev => !prev)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};
