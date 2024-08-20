import cn from 'classnames';
import styles from './Header.module.scss';
import { Link, NavLink } from 'react-router-dom';
import { HeaderPageListsSection } from '../../types/PageForShow';
import { useAppContext } from '../../AppContext';

export const Header = () => {
  const { setCurrentPage, favourites, cart } = useAppContext();
  const pageToShow = Object.values(HeaderPageListsSection).filter(
    link =>
      link !== HeaderPageListsSection.Favorites &&
      link !== HeaderPageListsSection.Cart,
  );

  const getActiveClass = ({ isActive }: { isActive: boolean }) =>
    cn(styles.header__link, { [styles['header__link--active']]: isActive });

  const getButtonIsActive = ({ isActive }: { isActive: boolean }) =>
    cn(styles.header__link, styles['header__link--add'], {
      [styles['header__link--active']]: isActive,
    });

  return (
    <header className={styles.header}>
      <Link
        to="/"
        className={styles.header__logo}
        onClick={() => setCurrentPage(HeaderPageListsSection.Home)}
      >
        <img src="./img/icons/Logo.png" alt="Nice Gadget Logo" />
      </Link>
      <div className={styles.header__toplist}>
        <nav className={styles['header__navigation--pages']}>
          <ul
            className={`${styles.header__list} ${styles['header__list--pages']}`}
          >
            {pageToShow.map(link => (
              <li className={styles.header__item} key={link}>
                <NavLink
                  to={
                    link === HeaderPageListsSection.Home
                      ? '/'
                      : link.toLowerCase()
                  }
                  className={getActiveClass}
                  onClick={() => setCurrentPage(link)}
                >
                  {link}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <nav className={styles.header__navigation}>
          <ul className={styles.header__list}>
            <li className={styles.header__link}>
              <NavLink
                to="/favourites"
                className={getButtonIsActive}
                onClick={() => setCurrentPage(HeaderPageListsSection.Favorites)}
              >
                <img
                  className={styles.header__image}
                  src="./img/icons/Favourites-empty.svg"
                  alt="Favourites (Heart Like)"
                />
                {favourites.length > 0 && (
                  <span className={styles.header__span}>
                    {favourites.length}
                  </span>
                )}
              </NavLink>
            </li>
            <li className={styles.header__link}>
              <NavLink
                to="/cart"
                className={getButtonIsActive}
                onClick={() => setCurrentPage(HeaderPageListsSection.Cart)}
              >
                <img
                  className={styles.header__image}
                  src="./img/icons/shoping-cart-empty.svg"
                  alt="Shopping bag (Cart)"
                />
                {cart.length > 0 && (
                  <span className={styles.header__span}>{cart.length}</span>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles['header__burger-icon']}>
        <NavLink to="/menu" className={styles['header__burger-menu']}>
          <img src="./img/icons/Menu.svg" alt="burger menu" />
        </NavLink>
      </div>
    </header>
  );
};
