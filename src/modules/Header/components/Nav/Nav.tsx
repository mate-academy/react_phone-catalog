import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Nav.module.scss';
import { useTranslation } from 'react-i18next';

const activeNavLink = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.link, {
    [styles.active ?? '']: isActive,
  });

export const Nav: React.FC<{ type: 'Header' | 'Menu' }> = ({ type }) => {
  const { t } = useTranslation();

  return (
    <nav aria-label={'navigation'} className={classNames(styles[`nav${type}`], styles.nav)}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <NavLink className={activeNavLink} to={'/'} aria-label={t('navigation.home')}>
            {t('navigation.home')}
          </NavLink>
        </li>
        <li className={styles.item}>
          <NavLink className={activeNavLink} to={'/phones'} aria-label={t('navigation.phones')}>
            {t('navigation.phones')}
          </NavLink>
        </li>
        <li className={styles.item}>
          <NavLink className={activeNavLink} to={'/tablets'} aria-label={t('navigation.tablets')}>
            {t('navigation.tablets')}
          </NavLink>
        </li>
        <li className={styles.item}>
          <NavLink
            className={activeNavLink}
            to={'/accessories'}
            aria-label={t('navigation.accessories')}
          >
            {t('navigation.accessories')}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
