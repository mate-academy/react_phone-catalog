import styles from './Header.module.scss';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';

export const Header = () => {
  const { pathname } = useLocation();

  return (
    <>
      <header className={styles.header}>
        <div className={styles.menu}>
          <Link to="/" className={styles.logoLink}>
            <img src="./img/Logo.svg" alt="Nice Gadgets logo" />
          </Link>

          <nav className={styles.nav}>
            <Link
              to="/"
              className={classNames(styles.navBtn, {
                [styles.isActiveMenu]: pathname === '/',
              })}
            >
              home
            </Link>
            <Link
              to="/phones"
              className={classNames(styles.navBtn, {
                [styles.isActiveMenu]: pathname === '/phones',
              })}
            >
              phones
            </Link>
            <Link
              to="/tablets"
              className={classNames(styles.navBtn, {
                [styles.isActiveMenu]: pathname === '/tablets',
              })}
            >
              tablets
            </Link>
            <Link
              to="/accessories"
              className={classNames(styles.navBtn, {
                [styles.isActiveMenu]: pathname === '/accessories',
              })}
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
