import React from 'react';
import styles from './SliderButton.module.scss';
import { NavLink } from 'react-router-dom';

type Props = {
  path: string;
};

export const SliderButton: React.FC<Props> = ({ path }) => {
  return (
    <button className={styles.button}>
      <NavLink to={path} className={styles.button__nav}>
        Order Now
      </NavLink>
    </button>
  );
};
