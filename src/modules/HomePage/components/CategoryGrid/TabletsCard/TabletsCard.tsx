import React from 'react';
import { Link } from 'react-router-dom';

import styles from './TabletsCard.module.scss';

type Props = {
  imageSrc: string;
  count: number;
  loading: boolean;
};

export const TabletsCard: React.FC<Props> = ({ imageSrc, count, loading }) => {
  const getSubtitleText = () => {
    if (loading) {
      return 'Loading...';
    }

    if (count === 0) {
      return 'No models';
    }

    if (count === 1) {
      return '1 model';
    }

    return `${count} models`;
  };

  return (
    <div className={styles.tabletsCard}>
      <div className={styles.tabletsCard__card}>
        <Link to="/tablets" className={styles.tabletsCard__imageContainer}>
          <img
            src={imageSrc}
            alt="Tablets"
            className={styles.tabletsCard__image}
          />
        </Link>
        <div className={styles.tabletsCard__content}>
          <h3 className={styles.tabletsCard__title}>Tablets</h3>
          <p className={styles.tabletsCard__subtitle}>{getSubtitleText()}</p>
        </div>
      </div>
    </div>
  );
};
