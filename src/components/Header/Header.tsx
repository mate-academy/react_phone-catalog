import { useContext, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import styles from './Header.module.scss';
import classNames from 'classnames';
import { PageLinks } from '../../types/PageLinks';
import { AppContext } from '../../context/AppContext';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isTablet = useMediaQuery({ minWidth: 640 });
  const isMobile = useMediaQuery({ maxWidth: 639 });
  const { activeLink, handlePageLinkClick } = useContext(AppContext)!;

  return (
    <header className={styles.header}>
      <a className={styles.header__logo}></a>

      {isMobile && (
        <div className={styles.header__buttonsContainer}>
          {isMenuOpen ? (
            <a
              href="#menu"
              className={`${styles.header__menuButton} ${styles.header__menuButtonClose}`}
              onClick={() => setIsMenuOpen(false)}
            ></a>
          ) : (
            <a
              href="#"
              className={styles.header__menuButton}
              onClick={() => setIsMenuOpen(true)}
            ></a>
          )}
        </div>
      )}

      {isTablet && (
        <div className={styles.header__buttonsContainer}>
          <div className={styles.header__navButtons}>
            <a
              // href=""
              className={classNames(styles.header__link, {
                [styles.header__linkActive]: activeLink === PageLinks.HOME,
              })}
              onClick={() => handlePageLinkClick(PageLinks.HOME)}
            >
              Home
            </a>

            <a
              // href=""
              className={classNames(styles.header__link, {
                [styles.header__linkActive]: activeLink === PageLinks.PHONES,
              })}
              onClick={() => handlePageLinkClick(PageLinks.PHONES)}
            >
              Phones
            </a>

            <a
              // href=""
              className={classNames(styles.header__link, {
                [styles.header__linkActive]: activeLink === PageLinks.TABLETS,
              })}
              onClick={() => handlePageLinkClick(PageLinks.TABLETS)}
            >
              Tablets
            </a>

            <a
              // href=""
              className={classNames(styles.header__link, {
                [styles.header__linkActive]:
                  activeLink === PageLinks.ACCESSORIES,
              })}
              onClick={() => handlePageLinkClick(PageLinks.ACCESSORIES)}
            >
              Accessories
            </a>
          </div>

          <div className={styles.header__favAndCart}>
            <a
              className={classNames(
                styles.header__favAndCartBtn,
                styles.header__favourites,
                {
                  [styles.header__linkActive]: activeLink === PageLinks.LIKED,
                },
              )}
              onClick={() => handlePageLinkClick(PageLinks.LIKED)}
            ></a>

            <a
              className={classNames(
                styles.header__favAndCartBtn,
                styles.header__cart,
                {
                  [styles.header__linkActive]: activeLink === PageLinks.CART,
                },
              )}
              onClick={() => handlePageLinkClick(PageLinks.CART)}
            ></a>
          </div>
        </div>
      )}
    </header>
  );
};
