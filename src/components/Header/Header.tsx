import { useContext } from 'react';
import { useMediaQuery } from 'react-responsive';
import styles from './Header.module.scss';
import classNames from 'classnames';
import { PageLinks } from '../../types/PageLinks';
import { AppContext } from '../../context/AppContext';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

export const Header = () => {
  const isTablet = useMediaQuery({ minWidth: 640 });
  const isMobile = useMediaQuery({ maxWidth: 639 });
  const { activeLink } = useContext(AppContext)!;
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const isMenuOpen = searchParams.has('menu');

  const toggleMenu = () => {
    if (isMenuOpen) {
      searchParams.delete('menu');
    } else {
      searchParams.set('menu', 'open');
    }

    navigate(`?${searchParams.toString()}`, { replace: true });
  };

  return (
    <header className={styles.header}>
      <a className={styles.header__logo}></a>

      {isMobile && (
        <div className={styles.header__buttonsContainer}>
          {isMenuOpen ? (
            <a
              className={`${styles.header__menuButton} ${styles.header__menuButtonClose}`}
              onClick={toggleMenu}
            ></a>
          ) : (
            <a className={styles.header__menuButton} onClick={toggleMenu}></a>
          )}
        </div>
      )}

      {isTablet && (
        <div className={styles.header__buttonsContainer}>
          <div className={styles.header__navButtons}>
            <NavLink
              to="/"
              className={classNames(styles.header__link, {
                [styles.header__linkActive]: activeLink === PageLinks.HOME,
              })}
              // onClick={() => handlePageLinkClick(PageLinks.HOME)}
            >
              Home
            </NavLink>

            <NavLink
              to="phones"
              className={classNames(styles.header__link, {
                [styles.header__linkActive]: activeLink === PageLinks.PHONES,
              })}
              // onClick={() => handlePageLinkClick(PageLinks.PHONES)}
            >
              Phones
            </NavLink>

            <NavLink
              to="tablets"
              className={classNames(styles.header__link, {
                [styles.header__linkActive]: activeLink === PageLinks.TABLETS,
              })}
              // onClick={() => handlePageLinkClick(PageLinks.TABLETS)}
            >
              Tablets
            </NavLink>

            <NavLink
              to="accessories"
              className={classNames(styles.header__link, {
                [styles.header__linkActive]:
                  activeLink === PageLinks.ACCESSORIES,
              })}
              // onClick={() => handlePageLinkClick(PageLinks.ACCESSORIES)}
            >
              Accessories
            </NavLink>
          </div>

          <div className={styles.header__favAndCart}>
            <NavLink
              to="favourites"
              className={classNames(
                styles.header__favAndCartBtn,
                styles.header__favourites,
                {
                  [styles.header__linkActive]: activeLink === PageLinks.LIKED,
                },
              )}
              // onClick={() => handlePageLinkClick(PageLinks.LIKED)}
            ></NavLink>

            <NavLink
              to="cart"
              className={classNames(
                styles.header__favAndCartBtn,
                styles.header__cart,
                {
                  [styles.header__linkActive]: activeLink === PageLinks.CART,
                },
              )}
              // onClick={() => handlePageLinkClick(PageLinks.CART)}
            ></NavLink>
          </div>
        </div>
      )}
    </header>
  );
};
