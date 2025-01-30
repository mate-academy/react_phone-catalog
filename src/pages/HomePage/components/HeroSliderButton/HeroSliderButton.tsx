import React from 'react';
import styles from './HeroSliderButton.module.scss';
import { NavLink } from 'react-router-dom';

type Props = {
  path: string;
};

export const HeroSliderButton: React.FC<Props> = ({ path }) => {
  return (
    <div className={styles.container}>
      <NavLink to={path} className={styles.nav}>
        <button className={styles.nav__button}>Order Now</button>
      </NavLink>
    </div>
  );
};
