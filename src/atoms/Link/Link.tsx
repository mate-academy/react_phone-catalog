import React from 'react';
import styles from './Link.module.scss';
import { NavLink } from 'react-router-dom';
import { cn } from '@/utils/cn';

type Props = {
  children: React.ReactNode;
  to: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

const Link: React.FC<Props> = ({ children, to, onClick }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        cn(styles.link, { [styles.active]: isActive })
      }
    >
      {children}
    </NavLink>
  );
};

export default Link;
