import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import styles from './NavButtonItem.module.scss';
import React from 'react';
import { CounterIcon } from '../CounterIcon';
import { Icon } from '../Icon';

type Props = {
  path: string;
  type: 'heart' | 'cart';
  isSquare?: boolean;
  counter: number;
};

export const NavButtonItem: React.FC<Props> = ({
  path,
  type,
  isSquare,
  counter,
}) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) => {
        return cn(`${styles['nav-btn']}`, 'link', {
          'is-active': isActive,
          [styles['nav-btn--square']]: isSquare,
        });
      }}
    >
      <Icon type={type} />

      <div className={styles['nav-btn__counter']}>
        <CounterIcon counter={counter} />
      </div>
    </NavLink>
  );
};
