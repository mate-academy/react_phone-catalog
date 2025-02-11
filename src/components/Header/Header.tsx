import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import styles from './Header.module.scss';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isTablet = useMediaQuery({ minWidth: 640 });
  const isMobile = useMediaQuery({ maxWidth: 639 });

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
            <a href="" className={styles.header__link}>
              Home
            </a>

            <a href="" className={styles.header__link}>
              Phones
            </a>

            <a href="" className={styles.header__link}>
              Tablets
            </a>

            <a href="" className={styles.header__link}>
              Accessories
            </a>
          </div>

          <div className={styles.header__favAndCart}>
            <a
              href=""
              className={`${styles.header__favAndCartBtn} ${styles.header__favourites}`}
            ></a>

            <a
              href=""
              className={`${styles.header__favAndCartBtn} ${styles.header__cart}`}
            ></a>
          </div>
        </div>
      )}
    </header>
  );
};
