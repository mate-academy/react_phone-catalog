import React from 'react';
import styles from './Category.module.scss';
import { NavLink } from 'react-router-dom';

type Props = {
  path: string;
  imgSrc: string;
  counter: number;
  name: string;
};

export const Category: React.FC<Props> = ({ path, imgSrc, counter, name }) => {
  return (
    <article className={styles.category}>
      <NavLink to={path} className={styles.category__link}>
        <div className={styles['category__img-wrapper']}>
          <img src={imgSrc} alt="" className={styles.category__img} />
        </div>

        <h4 className={styles.category__title}>{name}</h4>
        <p className={styles.category__counter}>{counter} models</p>
      </NavLink>
    </article>
  );
};
