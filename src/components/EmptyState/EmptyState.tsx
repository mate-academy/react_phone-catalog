import React from 'react';
import styles from './EmptyState.module.scss';

interface Props {
  message: string;
  imageSrc?: string;
  alt?: string;
}

export const EmptyState: React.FC<Props> = ({
  message,
  imageSrc = '/public/img/page-not-found.png',
  alt = 'Not Found',
}) => (
  <section className={styles.emptyState}>
    <h4 className={styles.emptyState__title}>{message}</h4>
    <img src={imageSrc} alt={alt} className={styles.emptyState__image} />
  </section>
);
