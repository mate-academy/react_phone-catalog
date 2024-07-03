import styles from './Header.module.scss';
import { PageSection } from '../../types/PageSection';
import classNames from 'classnames';
import { useAppContext } from '../../AppContext';
import { Link, NavLink } from 'react-router-dom';

export const Header = () => {
  const pagesToShow = Object.values(PageSection).filter(
    link => link !== PageSection.Favorites && link !== PageSection.Cart,
  );
  const { setCurrentPage, favourites, cart } = useAppContext();
  const getActiveLink = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.header__link, {
      [styles['header__link--active']]: isActive,
    });
  const getActiveButtons = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.header__link, styles['header__link--adds'], {
      [styles['header__link--active']]: isActive,
    });

  return (
    <header className={styles.header}>
      <Link
        to="/"
        className={styles.header__logo}
        onClick={() => setCurrentPage(PageSection.Home)}
      >
        <img src="img/Logo.svg" alt="" />
      </Link>
      <div className={styles.header__toplist}>
        <nav className={styles['header__navigation--pages']}>
          <ul
            className={`${styles.header__list} ${styles['header__list--pages']}`}
          >
            {pagesToShow.map(link => (
              <li className={styles.header__item} key={link}>
                <NavLink
                  to={link === PageSection.Home ? '/' : link.toLowerCase()}
                  className={getActiveLink}
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
                className={getActiveButtons}
                onClick={() => setCurrentPage(PageSection.Favorites)}
              >
                <img
                  className={styles.header__image}
                  src="img/header/favorite.svg"
                  alt="favorite"
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
                className={getActiveButtons}
                onClick={() => setCurrentPage(PageSection.Cart)}
              >
                <img src="img/header/cart.svg" alt="cart" />
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
          <img src="img/header/burger-menu.svg" alt="burger-menu" />
        </NavLink>
      </div>
    </header>
  );
};
