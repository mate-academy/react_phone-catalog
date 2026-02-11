import React from 'react';
import { Link } from 'react-router-dom';

import styles from './AccessoriesCard.module.scss';

type Props = {
  imageSrc: string;
  count: number;
  loading: boolean;
};

export const AccessoriesCard: React.FC<Props> = ({
  imageSrc,
  count,
  loading,
}) => {
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
    <div className={styles.accessoriesCard}>
      <div className={styles.accessoriesCard__card}>
        <Link
          to="/accessories"
          className={styles.accessoriesCard__imageContainer}
        >
          <img
            src={imageSrc}
            alt="Tablets"
            className={styles.accessoriesCard__image}
          />
        </Link>
        <div className={styles.accessoriesCard__content}>
          <h3 className={styles.accessoriesCard__title}>Accessories</h3>
          <p className={styles.accessoriesCard__subtitle}>
            {getSubtitleText()}
          </p>
        </div>
      </div>
    </div>
  );
};
