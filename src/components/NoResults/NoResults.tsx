import React from 'react';
import styles from './NoResults.module.scss';

interface Props {
  categoryName?: string;
}

export const NoResults: React.FC<Props> = ({ categoryName = 'products' }) => (
  <div className={styles.noResults} role="status" aria-live="polite">
    <h2 className={styles.title}>
      {`There are no ${categoryName.toLowerCase()} yet`}
    </h2>
  </div>
);
