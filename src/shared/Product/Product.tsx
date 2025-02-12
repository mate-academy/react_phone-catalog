import React from 'react';
import styles from './Product.module.scss';
import { Article } from '../types/Article';

type Props = {
  article: Article;
};

export const Product: React.FC<Props> = ({ article }) => {
  return (
    <article className={styles.article}>
      <img src={article.image} alt="Product Image" className={styles.image} />
      <p className={styles.title}>{article.name}</p>

      <h3 className={styles.price}>{`$${article.price}`}</h3>

      <div className={styles.decription}>
        <div className={styles.decription__item}>
          <p className={styles.decription__name}>Screen</p>
          <p className={styles.decription__value}>{article.screen}</p>
        </div>

        <div className={styles.decription__item}>
          <p className={styles.decription__name}>Capacity</p>
          <p className={styles.decription__value}>{article.capacity}</p>
        </div>

        <div className={styles.decription__item}>
          <p className={styles.decription__name}>RAM</p>
          <p className={styles.decription__value}>{article.ram}</p>
        </div>
      </div>

      <div className={styles.wrapper}>
        <button className={styles.button}>
          <p className={styles.button__title}>Add to cart</p>
        </button>
        <button className={styles.favourite}>
        </button>
      </div>
    </article>
  );
};
