import { useEffect } from 'react';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  useEffect(() => {
    const footer = document.querySelector('footer');

    if (footer) {
      footer.style.display = 'none';
    }

    return () => {
      if (footer) {
        footer.style.display = 'flex';
      }
    };
  }, []);

  return (
    <div className={styles.notFound}>
      <span className={styles.notFound__image} />
      <h1 className={styles.notFound__header}>Page not found</h1>
    </div>
  );
};
