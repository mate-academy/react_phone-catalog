import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavLinkItem.module.scss';

interface NavLinkItemProps {
  to: string;
  children: React.ReactNode;
  isBurgerMenu?: boolean;
}

const NavLinkItem: React.FC<NavLinkItemProps> = ({
  to,
  children,
  isBurgerMenu = false,
}) => {
  const itemClass = isBurgerMenu ? styles.burger__item : styles.navbar__item;
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `${isBurgerMenu ? styles.burger__link : styles.navbar__link} ${
      isActive
        ? isBurgerMenu
          ? styles['burger__link--active']
          : styles['navbar__link--active']
        : ''
    }`;

  return (
    <li className={itemClass}>
      <NavLink to={to} className={linkClass}>
        {children}
      </NavLink>
    </li>
  );
};

export default NavLinkItem;
