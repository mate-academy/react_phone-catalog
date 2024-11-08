import { FC } from 'react';

import styles from './Loader.module.scss';

export const Loader: FC = () => {
  return (
    <section className={styles.loading}>
      <div className={styles.spinner} />
    </section>
  );
};
