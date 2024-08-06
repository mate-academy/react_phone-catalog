import styles from './Header.module.scss';
import classNames from 'classnames';
import { Link, NavLink } from 'react-router-dom';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.navBtn, { [styles.isActiveMenu]: isActive });

export const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.menu}>
          <Link to="/" className={styles.logoLink}>
            <img src="./img/Logo.svg" alt="Nice Gadgets logo" />
          </Link>

          <nav className={styles.nav}>
            <NavLink to="/" className={getLinkClass}>
              home
            </NavLink>
            <NavLink to="/phones" className={getLinkClass}>
              phones
            </NavLink>
            <NavLink to="/tablets" className={getLinkClass}>
              tablets
            </NavLink>
            <NavLink to="/accessories" className={getLinkClass}>
              accessories
            </NavLink>
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
