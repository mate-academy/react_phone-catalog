import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import styles from './Header.module.scss';
import classNames from 'classnames';

enum Links {
  HOME = 'home',
  PHONES = 'phones',
  TABLETS = 'tablets',
  ACCESSORIES = 'accessories',
  LIKED = 'liked',
  CART = 'cart',
}

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isTablet = useMediaQuery({ minWidth: 640 });
  const isMobile = useMediaQuery({ maxWidth: 639 });
  const [activeLink, setActiveLink] = useState<Links>(Links.HOME);

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
                [styles.header__linkActive]: activeLink === Links.HOME,
              })}
              onClick={() => setActiveLink(Links.HOME)}
            >
              Home
            </a>

            <a
              // href=""
              className={classNames(styles.header__link, {
                [styles.header__linkActive]: activeLink === Links.PHONES,
              })}
              onClick={() => setActiveLink(Links.PHONES)}
            >
              Phones
            </a>

            <a
              // href=""
              className={classNames(styles.header__link, {
                [styles.header__linkActive]: activeLink === Links.TABLETS,
              })}
              onClick={() => setActiveLink(Links.TABLETS)}
            >
              Tablets
            </a>

            <a
              // href=""
              className={classNames(styles.header__link, {
                [styles.header__linkActive]: activeLink === Links.ACCESSORIES,
              })}
              onClick={() => setActiveLink(Links.ACCESSORIES)}
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
                  [styles.header__linkActive]: activeLink === Links.LIKED,
                },
              )}
              onClick={() => setActiveLink(Links.LIKED)}
            ></a>

            <a
              className={classNames(
                styles.header__favAndCartBtn,
                styles.header__cart,
                {
                  [styles.header__linkActive]: activeLink === Links.CART,
                },
              )}
              onClick={() => setActiveLink(Links.CART)}
            ></a>
          </div>
        </div>
      )}
    </header>
  );
};
