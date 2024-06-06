import { useEffect } from 'react';
import styles from './Placeholder.module.scss';

export const Placeholder = () => {
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
    <div className={styles.placeholder}>
      <span className={styles.placeholder__image} />
      <h1 className={styles.placeholder__header}>
        Oops! It&apos;s still empty here
      </h1>
    </div>
  );
};
