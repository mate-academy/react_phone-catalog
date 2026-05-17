import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import styles from './NavMain.module.scss';
import { useTranslation } from 'react-i18next';

export const NavMain = () => {
  const { i18n, t } = useTranslation();

  const navLinkActiveClass = (isActive: boolean) =>
    cn(styles.nav__link, { [styles.nav__link_active]: isActive });

  return (
    <nav className={styles.nav}>
      <ul className={styles.nav__list}>
        <li className={styles.nav__item}>
          <NavLink
            to="/"
            className={({ isActive }) => navLinkActiveClass(isActive)}
          >
            {t('header.home')}
          </NavLink>
        </li>
        <li className={styles.nav__item}>
          <NavLink
            to="phones"
            className={({ isActive }) => navLinkActiveClass(isActive)}
          >
            {t('header.phones')}
          </NavLink>
        </li>
        <li className={styles.nav__item}>
          <NavLink
            to="tablets"
            className={({ isActive }) => navLinkActiveClass(isActive)}
          >
            {t('header.tablets')}
          </NavLink>
        </li>
        <li className={styles.nav__item}>
          <NavLink
            to="accessories"
            className={({ isActive }) => navLinkActiveClass(isActive)}
          >
            {t('header.accessories')}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
