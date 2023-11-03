import React, { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Action.module.scss';

type Props = {
  link: string,
  children: ReactNode,
};

export const Action: React.FC<Props> = ({ link, children }) => {
  return (
    <NavLink
      to={link}
      className={({ isActive }) => (
        classNames(styles.link, { [styles.active]: isActive })
      )}
    >
      {children}
    </NavLink>
  );
};
