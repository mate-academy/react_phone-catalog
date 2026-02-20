import styles from './Navigation.module.scss';

import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { NAVIGATION_LINKS } from '../../constants/navigationLinks';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.navigation__link, {
    [styles['navigation__link--active']]: isActive,
  });

type Props = {
  onLinkClick: () => void;
};

export const Navigation: React.FC<Props> = ({ onLinkClick }) => {
  const links = useMemo(() => NAVIGATION_LINKS, []);

  return (
    <nav className={styles.navigation}>
      <ul className={styles.navigation__list}>
        {links.map(({ name, route }) => (
          <li key={name}>
            <NavLink className={getLinkClass} to={route} onClick={onLinkClick}>
              {name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
