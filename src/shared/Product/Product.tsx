import React from 'react';
import styles from './Product.module.scss';
import { Article } from '../types/Article';

type Props = {
  article: Article;
  fullPrice?: boolean;
};

export const Product: React.FC<Props> = ({ article, fullPrice = false }) => {
  return (
    <article className={styles.article}>
      <img src={article.image} alt="Product Image" className={styles.image} />
      <p className={styles.title}>{article.name}</p>

      <div className={styles.prices}>
        <h3 className={styles.price}>{`$${article.price}`}</h3>
        {fullPrice && (
          <h3 className={styles.fullPrice}>{`$${article.fullPrice}`}</h3>
        )}
      </div>

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
        <button className={styles.favourite}></button>
      </div>
    </article>
  );
};
