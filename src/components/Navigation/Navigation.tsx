import { NavLink } from 'react-router-dom';

import styles from './Navigation.module.scss';
import { NavItems } from '../../types/NavItems';
import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { instantScroll } from '../../utils/instantScroll';

interface Props {
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (open: boolean) => void;
}

const activeLink = ({ isActive }: { isActive: ReactNode }) => {
  return classNames(styles.navItem, { [styles.activeLink]: isActive });
};

export const Navigation: React.FC<Props> = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const handleClick = () => {
    if (setIsMobileMenuOpen) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    }
  };

  return (
    <nav className={styles.nav}>
      {Object.entries(NavItems).map(([key, value]) => (
        <NavLink
          to={`/${value}`}
          className={activeLink}
          key={key}
          onClick={handleClick}
          onMouseUp={instantScroll}
        >
          {key}
        </NavLink>
      ))}
    </nav>
  );
};
