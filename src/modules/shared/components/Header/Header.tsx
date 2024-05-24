import { useState } from 'react';
import styles from './Header.module.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

export const Header = () => {
  const [isActive, setIsActive] = useState('');

  return (
    <>
      <header className={styles.header}>
        <div className={styles.menu}>
          <Link to="/" className={styles.logoLink}>
            <img src="./img/Logo.svg" alt="Nice Gadgets logo" />
          </Link>

          <nav className={styles.nav}>
            <Link
              to="#"
              className={classNames(styles.navBtn, {
                [styles.isActiveMenu]: isActive === 'home',
              })}
              onClick={() => setIsActive('home')}
            >
              home
            </Link>
            <Link
              to="#"
              className={classNames(styles.navBtn, {
                [styles.isActiveMenu]: isActive === 'phones',
              })}
              onClick={() => setIsActive('phones')}
            >
              phones
            </Link>
            <Link
              to="#"
              className={classNames(styles.navBtn, {
                [styles.isActiveMenu]: isActive === 'tablets',
              })}
              onClick={() => setIsActive('tablets')}
            >
              tablets
            </Link>
            <Link
              to="#"
              className={classNames(styles.navBtn, {
                [styles.isActiveMenu]: isActive === 'accessories',
              })}
              onClick={() => setIsActive('accessories')}
            >
              accessories
            </Link>
          </nav>
        </div>

        <div className={styles.icons}>
          <div className={styles.iconBox}>
            <Link
              to="#"
              className={`${styles.iconLink} ${styles.favorites}`}
            ></Link>
          </div>
          <div className={styles.iconBox}>
            <Link to="#" className={`${styles.iconLink} ${styles.cart}`}></Link>
          </div>
        </div>

        <div className={`${styles.iconBox} ${styles.mobileMenu}`}>
          <Link to="#" className={styles.iconMobileMenu}></Link>
        </div>
      </header>
    </>
  );
};
