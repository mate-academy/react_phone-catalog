import React from 'react';
import styles from './EmptyState.module.scss';

interface Props {
  image: string;
  message: string;
}

export const EmptyState: React.FC<Props> = ({ image, message }) => {
  return (
    <div className={styles.container}>
      <img src={image} alt={message} className={styles.image} />
      <span className={styles.text}>{message}</span>
    </div>
  );
};
