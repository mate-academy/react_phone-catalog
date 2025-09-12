import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.scss';
import classNames from 'classnames';

type Props = {
  isAside?: boolean;
};

export const Navigation = ({ isAside = false }: Props) => {
  return (
    <nav
      className={classNames(styles.navigation, {
        [styles['navigation--aside']]: isAside,
      })}
    >
      <ul
        className={classNames(styles.navigation__list, {
          [styles['navigation__list--aside']]: isAside,
        })}
      >
        <li
          className={classNames(styles.navigation__item, {
            [styles['navigation__item--aside']]: isAside,
          })}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? `${styles.navigation__link} ${isAside && styles['navigation__link--aside']} ${styles['navigation__link--active']}`
                : styles.navigation__link
            }
          >
            Home
          </NavLink>
        </li>
        <li
          className={classNames(styles.navigation__item, {
            [styles['navigation__item--aside']]: isAside,
          })}
        >
          <NavLink
            to="/phones"
            className={({ isActive }) =>
              isActive
                ? `${styles.navigation__link}  ${isAside && styles['navigation__link--aside']} ${styles['navigation__link--active']}`
                : styles.navigation__link
            }
            end
          >
            Phones
          </NavLink>
        </li>
        <li
          className={classNames(styles.navigation__item, {
            [styles['navigation__item--aside']]: isAside,
          })}
        >
          <NavLink
            to="/tablets"
            className={({ isActive }) =>
              isActive
                ? `${styles.navigation__link}  ${isAside && styles['navigation__link--aside']} ${styles['navigation__link--active']}`
                : styles.navigation__link
            }
            end
          >
            Tablets
          </NavLink>
        </li>
        <li
          className={classNames(styles.navigation__item, {
            [styles['navigation__item--aside']]: isAside,
          })}
        >
          <NavLink
            to="/accessories"
            className={({ isActive }) =>
              isActive
                ? `${styles.navigation__link}  ${isAside && styles['navigation__link--aside']} ${styles['navigation__link--active']}`
                : styles.navigation__link
            }
            end
          >
            Accessories
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
