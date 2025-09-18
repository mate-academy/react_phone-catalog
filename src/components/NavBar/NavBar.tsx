import { Link, NavLink } from 'react-router-dom';
import styles from './NavBar.module.scss';
import classNames from 'classnames';

const getLinkActive = ({ isActive }: { isActive: boolean }) =>
  classNames(styles['top-bar__link'], {
    [styles['top-bar__link--active']]: isActive,
  });

export const NavBar = () => {
  return (
    <div className={styles['top-bar']}>
      <div className={styles['top-bar__nav-links']}>
        <Link className={styles['top-bar__logo-link']} to="/">
          <img
            className={styles['top-bar__logo']}
            src="/img/icons/logo.svg"
            alt="Nice Gadgets logo"
          />
        </Link>

        <nav className="top-bar__nav">
          <ul className={styles['top-bar__list']}>
            <li className="top-bar__item">
              <NavLink className={getLinkActive} to="/">
                Home
              </NavLink>
            </li>
            <li className="top-bar__item">
              <NavLink className={getLinkActive} to="/phones">
                Phones
              </NavLink>
            </li>
            <li className="top-bar__item">
              <NavLink className={getLinkActive} to="/tablets">
                Tablets
              </NavLink>
            </li>
            <li className="top-bar__item">
              <NavLink className={getLinkActive} to="/accessories">
                Accessories
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles['user-nav']}>
        <a className={styles['user-nav__link']} href="#">
          <img
            className="user-nav__link-img"
            src="/img/icons/heart.svg"
            alt="heart icon"
          ></img>
          <span className={styles['user-nav__num']}>12</span>
        </a>
        <a className={styles['user-nav__link']} href="#">
          <img
            className="user-nav__link-img"
            src="/img/icons/shopping-bag.svg"
            alt="bag icon"
          ></img>
          <span className={styles['user-nav__num']}>12</span>
        </a>
      </div>
    </div>
  );
};
