import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './HeaderList.module.scss';

type Props = {
  navLinks: { to: string; label: string }[];
  getNavLinkClass: ({ isActive }: { isActive: boolean }) => string;
  setIsBurgerActive: (isActive: boolean) => void;
};

export const HeaderList: React.FC<Props> = ({
  navLinks,
  getNavLinkClass,
  setIsBurgerActive,
}) => {
  return (
    <ul className={styles.list}>
      {navLinks.map(({ to, label }) => (
        <li key={to} className={styles.list__item}>
          <NavLink
            to={to}
            className={getNavLinkClass}
            onClick={() => setIsBurgerActive(false)}
          >
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
