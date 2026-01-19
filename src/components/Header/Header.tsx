import Menu from '../Menu/index';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <a href="#">
          <picture>
            <source srcSet="img/logo-desktop.svg" media="(min-width: 1024px)" />
            <source srcSet="img/logo-tablet.svg" media="(min-width: 576px)" />
            <img
              src="img/logo-mobile.svg"
              alt="The Nice Gadgets Logo"
              title="The Nice Gadgets Logo"
              className={styles.topBar__logo}
            />
          </picture>
        </a>
        <div className={styles.topBar__menu}>
          <Menu />
        </div>

        <div className={styles.topBar__icons}>
          <div className={styles.icon__background}>
            <a
              href="#favourites"
              className={`${styles.icon} ${styles['icon--favourites']}`}
            ></a>
          </div>
          <div className={styles.icon__background}>
            <a
              href="#shopping-bag-cart"
              className={`${styles.icon} ${styles['icon--shopping-bag-cart']}`}
            ></a>
          </div>

          <div className={styles.icon__background}>
            <a
              href="#menu"
              className={`${styles.icon} ${styles['icon--menu']}`}
            ></a>
          </div>
        </div>
      </div>
    </header>
  );
};
