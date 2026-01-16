import Menu from '../Menu/index';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <a href="#">
          <img
            src="img/logo-2x.png"
            alt="The Nice Gadgets Logo"
            title="The Nice Gadgets Logo"
            className="top-bar__logo"
          />
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
