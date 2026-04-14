import React, { useEffect } from 'react';
import styles from './RightsPage.module.scss';

export const RightsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Rights</h1>

      <div className={styles.content}>
        <p className={styles['small-text12Light']}>
          © {new Date().getFullYear()} Nice Gadgets Store
        </p>

        <p className={styles['body-text14']}>
          All rights reserved. All product names, logos, and brands are property
          of their respective owners.
        </p>

        <p className={styles['body-text14']}>
          This website is created for educational purposes only.
        </p>
      </div>
    </div>
  );
};
