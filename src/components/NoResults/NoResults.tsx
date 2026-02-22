import React from 'react';
import styles from './NoResults.module.scss';

interface Props {
  categoryName: string;
}

export const NoResults: React.FC<Props> = ({ categoryName }) => (
  <div className={styles.noResults}>
    <h2 className={styles.title}>{`There are no ${categoryName} yet`}</h2>
  </div>
);
