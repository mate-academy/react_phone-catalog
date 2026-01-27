import styles from './Menu.module.scss';
import { Link, NavLink } from 'react-router-dom';

export const Menu = ({ onClose }: { onClose: () => void }) => {
  return (
    <aside className={styles.menu}>
      <nav className={styles.menu__nav}>
        <Link to="/" className={styles.menu__nav__logo}>
          <img
            src="../public/img/logo.svg"
            alt="Nice Gadgets"
            className={styles.menu__nav__logo__img}
            onClick={onClose}
          />
        </Link>

        <button className={`${styles.menu__nav__button}`} onClick={onClose}>
          <img
            src="/public/img/icons/icon-close.svg"
            alt="icon-close"
            className={styles.menu__nav__button__icon}
          />
        </button>
      </nav>

      <ul className={styles.menu__list}>
        <li className={styles.menu__list__item}>
          <NavLink
            to="/"
            onClick={onClose}
            className={({ isActive }) =>
              isActive
                ? `${styles.menu__list__link} ${styles['menu__list__link--active']}`
                : `${styles.menu__list__link}`
            }
          >
            HOME
          </NavLink>
        </li>
        <li className={styles.menu__list__item}>
          <NavLink
            to="/phones"
            className={styles.menu__list__link}
            onClick={onClose}
          >
            Phones
          </NavLink>
        </li>
        <li className={styles.menu__list__item}>
          <NavLink
            to="/tablets"
            className={styles.menu__list__link}
            onClick={onClose}
          >
            TABLETS
          </NavLink>
        </li>
        <li className={styles.menu__list__item}>
          <NavLink
            to="/accessories"
            className={styles.menu__list__link}
            onClick={onClose}
          >
            ACCESSORIES
          </NavLink>
        </li>
      </ul>

      <div className={styles.menu__buttons}>
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            isActive
              ? `${styles.menu__button} ${styles['menu__button--active']}`
              : styles.menu__button
          }
          onClick={onClose}
        >
          <img
            src="/public/img/icons/icon-heart.svg"
            alt="icon-heart"
            className={styles.menu__button__icon}
          />
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive
              ? `${styles.menu__button} ${styles['menu__button--active']}`
              : styles.menu__button
          }
          onClick={onClose}
        >
          <img
            src="/public/img/icons/icon-shopping-bag.svg"
            alt="icon-shopping-bag"
            className={styles.menu__button__icon}
          />
        </NavLink>
      </div>
    </aside>
  );
};
