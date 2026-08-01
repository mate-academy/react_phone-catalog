import { Link, NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Header.module.scss';
import { scrollToTop } from '../../utils/functions';

export const Header = () => {
  const location = useLocation();

  return (
    <div className={styles.header}>
      <Link
        to=""
        className={classNames(styles.navbarTitle, styles.navbarLogo)}
        onClick={scrollToTop}
      >
        <img src={`${import.meta.env.BASE_URL}/img/Logo.svg`} alt="logo" />
      </Link>

      <div className={classNames(styles.navbar, styles.navbarStart)}>
        <NavLink
          to="home"
          className={classNames(styles.navbarTitle, {
            [styles.active]: location.pathname === '/',
          })}
          onClick={scrollToTop}
        >
          Home
        </NavLink>
        <NavLink
          to="phones"
          className={styles.navbarTitle}
          onClick={scrollToTop}
        >
          Phones
        </NavLink>
        <NavLink
          to="tablets"
          className={styles.navbarTitle}
          onClick={scrollToTop}
        >
          Tablets
        </NavLink>
        <NavLink
          to="accessories"
          className={styles.navbarTitle}
          onClick={scrollToTop}
        >
          Accessories
        </NavLink>
      </div>

      <div className={styles.navbar}>
        <a className={classNames(styles.navbarEnd, 'icons')}>
          <img
            src={`${import.meta.env.BASE_URL}/img/like.svg`}
            alt="logo"
            className="logo"
          />
        </a>
        <a className={classNames(styles.navbarEnd, 'icons')}>
          <img
            src={`${import.meta.env.BASE_URL}/img/buy.svg`}
            alt="logo"
            className="logo"
          />
        </a>
      </div>

      <a className={classNames(styles.navbarEnd, 'icons', styles.menu)}>
        <img
          src={`${import.meta.env.BASE_URL}/img/Menu.svg`}
          alt="logo"
          className="logo"
        />
      </a>
    </div>
  );
};
