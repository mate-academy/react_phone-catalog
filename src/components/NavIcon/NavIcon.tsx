import React from 'react';
import styles from './NavIcon.module.scss';
import { NavLink } from 'react-router-dom';
import { Icon } from '../Icon';

type Props = {
  path: string;
  type: 'favourite' | 'cart';
};

export const NavIcon: React.FC<Props> = ({ path, type }) => {
  return (
    <NavLink to={path} className={styles.navIcon}>
      <Icon type={type} />
    </NavLink>
  );
};
