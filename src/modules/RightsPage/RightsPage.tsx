import React from 'react';
import cl from 'classnames';

import styles from './RightsPage.module.scss';

export const RightsPage: React.FC = () => {
  return (
    <section className={cl('container', styles.section)}>
      <h1 className={styles.title}>Rights & Legal</h1>

      <div className={styles.content}>
        <div className={styles.textBlock}>
          <h3>Disclaimer</h3>
          <p>
            This website is a fictitious online store created solely for
            educational and portfolio purposes. No real products are sold, and
            no real transactions take place.
          </p>
        </div>

        <div className={styles.textBlock}>
          <h3>Copyright</h3>
          <p>
            All product images, names, and specifications used on this site are
            the property of their respective owners (Apple) and are used here
            under fair use for demonstration purposes only.
          </p>
        </div>
      </div>
    </section>
  );
};
