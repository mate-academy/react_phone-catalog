import React from 'react';
import styles from './Loader.module.scss'; // opcional, pode criar animação CSS

export const Loader: React.FC = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.spinner} aria-hidden="true" />
      <p>Loading...</p>
    </div>
  );
};
