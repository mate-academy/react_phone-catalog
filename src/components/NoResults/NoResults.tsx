import React from 'react';
import styles from './NoResults.module.scss';

interface Props {
  categoryName?: string;
  message?: string;
}

export const NoResults: React.FC<Props> = ({
  categoryName = 'products',
  message,
}) => (
  <div
    className={styles.noResults}
    role="status"
    aria-live="polite"
    aria-atomic="true"
  >
    <h2 className={styles.title}>
      {message || `There are no ${categoryName} yet`}
    </h2>
  </div>
);
