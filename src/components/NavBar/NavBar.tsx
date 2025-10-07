import { Link, NavLink } from 'react-router-dom';
import styles from './NavBar.module.scss';
import classNames from 'classnames';
import { useFavorites } from '../../context/Favoutires';
import { useCart } from '../../context/Cart';

const getLinkActive = ({ isActive }: { isActive: boolean }) =>
  classNames(styles['top-bar__link'], {
    [styles['top-bar__link--active']]: isActive,
  });

const getLinkActiveMenu = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.menu__link, {
    [styles['menu__link--active']]: isActive,
  });

export const NavBar = () => {
  const { count } = useFavorites();
  const { totalQty } = useCart();

  return (
    <>
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
          <a className={styles['user-nav__menu']} href="#menu"></a>
        </div>
      </div>
      <aside className={styles.menu} id="menu">
        <div className={styles.menu__content}>
          <div className={styles['top-bar']}>
            <div className={styles['top-bar__nav-links']}>
              <Link className={styles['top-bar__logo-link']} to="/">
                <img
                  className={styles['top-bar__logo']}
                  src="/img/icons/logo.svg"
                  alt="Nice Gadgets logo"
                />
              </Link>
            </div>
            <div className={styles['user-nav']}>
              <a
                className={`${styles['user-nav__menu']} ${styles['user-nav__menu--close']}`}
                href="#"
              ></a>
            </div>
          </div>
          <nav className="menu__nav">
            <ul className={styles.menu__list}>
              <li className="menu__item">
                <NavLink className={getLinkActiveMenu} to="/">
                  Home
                </NavLink>
              </li>
              <li className="menu__item">
                <NavLink className={getLinkActiveMenu} to="/phones">
                  Phones
                </NavLink>
              </li>
              <li className="menu__item">
                <NavLink className={getLinkActiveMenu} to="/tablets">
                  Tablets
                </NavLink>
              </li>
              <li className="menu__item">
                <NavLink className={getLinkActiveMenu} to="/accessories">
                  Accessories
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className={styles['menu__user-nav']}>
          <NavLink
            className={({ isActive }) =>
              `${styles['menu__user-nav-link']} ${isActive ? styles['menu__user-nav-link--active'] : ''}`
            }
            to="favorites"
          >
            <span className={styles['menu__user-nav-box']}>
              <img
                className={styles['menu__user-nav-link-img']}
                src="/img/icons/heart.svg"
                alt="heart icon"
              ></img>
              {count > 0 && (
                <span className={styles['menu__user-nav-num']}>{count}</span>
              )}
            </span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `${styles['menu__user-nav-link']} ${isActive ? styles['menu__user-nav-link--active'] : ''}`
            }
            to="cart"
          >
            <span className={styles['menu__user-nav-box']}>
              <img
                className={styles['menu__user-nav-link-img']}
                src="/img/icons/shopping-bag.svg"
                alt="bag icon"
              ></img>
              {totalQty > 0 && (
                <span className={styles['menu__user-nav-num']}>{totalQty}</span>
              )}
            </span>
          </NavLink>
        </div>
      </aside>
    </>
  );
};
