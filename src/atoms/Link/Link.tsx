import React from 'react';
import styles from './Link.module.scss';
import { NavLink } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
  to: string;
};

const Link: React.FC<Props> = ({ children, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${styles.link} ${isActive ? styles.active : ''}`
      }
    >
      {children}
    </NavLink>
  );
};

export default Link;
