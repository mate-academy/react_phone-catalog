import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';
import React from 'react';

type Props = {
  isNotFoundPage?: boolean;
};

export const NotFoundPage: React.FC<Props> = ({ isNotFoundPage = true }) => {
  const message = isNotFoundPage ? 'Page not found' : 'Product was not found';

  return (
    <div className={styles.wrapper}>
      <div className={styles.topContent}>
        <p className={styles.text}>{message}</p>

        <img src="/img/icons/icon-right-gray.svg" alt="Arrow right" />

        <Link to={'/'} className={styles.link}>
          <p className={styles.text}>Home</p>
        </Link>
      </div>

      {isNotFoundPage ? (
        <img
          className={styles.notFoundImg}
          src="/img/page-not-found.png"
          alt="Page not found"
        />
      ) : (
        <img
          className={styles.notFoundImg}
          src="/img/product-not-found.png"
          alt="Product not found"
        />
      )}
    </div>
  );
};
