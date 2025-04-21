import React from 'react';
import styles from './HeroSliderButton.module.scss';
import { NavLink } from 'react-router-dom';

type Props = {
  path: string;
};

export const HeroSliderButton: React.FC<Props> = ({ path }) => {
  return (
    <div className={styles.container}>
      <button className={styles.button}>
        <NavLink to={path} className={styles.button__nav}>
          Order Now
        </NavLink>
      </button>
    </div>
  );
};
