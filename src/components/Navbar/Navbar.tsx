import React from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.scss';

type Props = {
  className?: string;
};

export const Navbar: React.FC<Props> = ({ className }) => {
  const getActiveLink = ({ isActive }: { isActive: boolean }) =>
    cn(
      styles.navbar__item,
      { [styles['navbar__item--active']]: isActive },
      className,
    );

  return (
    <>
      <NavLink to="/" className={getActiveLink} end>
        Home
      </NavLink>
      <NavLink to="/phones" className={getActiveLink}>
        Phones
      </NavLink>
      <NavLink to="/tablets" className={getActiveLink}>
        Tablets
      </NavLink>
      <NavLink to="/accessories" className={getActiveLink}>
        Accessories
      </NavLink>
    </>
  );
};
