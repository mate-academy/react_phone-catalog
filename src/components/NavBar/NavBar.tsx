import { Link, NavLink } from 'react-router-dom';
import styles from './NavBar.module.scss';
import classNames from 'classnames';
import { useFavorites } from '../../context/Favoutires';
import { useCart } from '../../context/Cart';

const getLinkActive = ({ isActive }: { isActive: boolean }) =>
  classNames(styles['top-bar__link'], {
    [styles['top-bar__link--active']]: isActive,
  });

export const NavBar = () => {
  const { count } = useFavorites();
  const { totalQty } = useCart();

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
        <NavLink
          className={({ isActive }) =>
            `${styles['user-nav__link']} ${isActive ? styles['user-nav__link--active'] : ''}`
          }
          to="favorites"
        >
          <img
            className="user-nav__link-img"
            src="/img/icons/heart.svg"
            alt="heart icon"
          ></img>
          {count > 0 && (
            <span className={styles['user-nav__num']}>{count}</span>
          )}
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${styles['user-nav__link']} ${isActive ? styles['user-nav__link--active'] : ''}`
          }
          to="cart"
        >
          <img
            className="user-nav__link-img"
            src="/img/icons/shopping-bag.svg"
            alt="bag icon"
          ></img>
          {totalQty > 0 && (
            <span className={styles['user-nav__num']}>{totalQty}</span>
          )}
        </NavLink>
      </div>
    </div>
  );
};
