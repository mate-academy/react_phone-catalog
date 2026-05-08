import React from 'react';
import styles from './CategoryCard.module.scss';
import { Link } from 'react-router-dom';

type Props = {
  nameCategory: string;
  countModels: number;
  imageCategory: string;
  bgColor: string;
  linkTo: string;
};

export const CategoryCard = ({
  nameCategory,
  imageCategory,
  countModels,
  bgColor,
  linkTo,
}: Props) => {
  return (
    <article className={styles.categories}>
      <div
        className={styles.image_container}
        style={{ backgroundColor: bgColor }}
      >
        <Link to={linkTo}>
          <img
            className={styles.image}
            src={imageCategory}
            alt={nameCategory}
          />
        </Link>
      </div>
      <Link className={styles.categories_name} to={linkTo}>
        {nameCategory}
      </Link>
      <p className={styles.categories_count}>{countModels} models</p>
    </article>
  );
};
