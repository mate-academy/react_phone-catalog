import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.scss';
import classNames from 'classnames';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useTranslation } from 'react-i18next';

type Props = {
  isAside?: boolean;
};

export const Navigation = ({ isAside = false }: Props) => {
  const { t } = useTranslation();

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
            end
          >
            {t('nav.home')}
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
          >
            {t('nav.phones')}
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
          >
            {t('nav.tablets')}
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
          >
            {t('nav.accessories')}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
