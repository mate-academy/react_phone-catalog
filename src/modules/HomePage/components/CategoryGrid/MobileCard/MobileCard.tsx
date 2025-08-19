import React from 'react';
import { Link } from 'react-router-dom';

import styles from './MobileCard.module.scss';

type Props = {
  imageSrc: string;
  count: number;
  loading: boolean;
};

export const MobileCard: React.FC<Props> = ({ imageSrc, count, loading }) => {
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
    <div className={styles.mobileCard}>
      <div className={styles.mobileCard__card}>
        <Link to="/phones" className={styles.mobileCard__imageContainer}>
          <img
            src={imageSrc}
            alt="Mobile Phones"
            className={styles.mobileCard__image}
          />
        </Link>
        <div className={styles.mobileCard__content}>
          <h3 className={styles.mobileCard__title}>Mobile phones</h3>
          <p className={styles.mobileCard__subtitle}>{getSubtitleText()}</p>
        </div>
      </div>
    </div>
  );
};
