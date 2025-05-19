import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import styles from './ListOfTextLinks.module.scss';
import React from 'react';

type Props = {
  direction: 'row' | 'column';
};

export const ListOfTextLinks: React.FC<Props> = ({ direction }) => {
  function getLinkClass({ isActive }: { isActive: boolean }) {
    return classNames('link', styles.textLink, {
      [styles.textLinkActive]: isActive,
    });
  }

  return (
    <ul
      className={classNames({
        [styles.headerList]: direction === 'row',
        [styles.sidebarList]: direction === 'column',
      })}
    >
      <li className={styles.listItem}>
        <NavLink to={'/'} className={getLinkClass}>
          home
        </NavLink>
      </li>
      <li className={styles.listItem}>
        <NavLink to={'/phones'} className={getLinkClass}>
          Phones
        </NavLink>
      </li>
      <li className={styles.listItem}>
        <NavLink to={'/tablets'} className={getLinkClass}>
          tablets
        </NavLink>
      </li>
      <li className={styles.listItem}>
        <NavLink to={'/accessories'} className={getLinkClass}>
          accessories
        </NavLink>
      </li>
    </ul>
  );
};
