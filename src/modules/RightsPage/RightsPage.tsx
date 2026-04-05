import React, { useEffect } from 'react';
import styles from './RightsPage.module.scss';

export const RightsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.container}>
      <h1 className="h1">Rights</h1>

      <div className={styles.content}>
        <p>© {new Date().getFullYear()} Nice Gadgets Store</p>

        <p>
          All rights reserved. All product names, logos, and brands are property
          of their respective owners.
        </p>

        <p>This website is created for educational purposes only.</p>
      </div>
    </div>
  );
};
