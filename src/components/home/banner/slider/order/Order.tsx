import { FC } from 'react';

import styles from './order.module.scss';

export const Order: FC = () => (
  <div className={styles.order}>
    <h2 className={styles.text}>
      <span className={styles.gradient}>Now available in our store!</span>
      👌
    </h2>
    <p>Be the first!</p>
    <button className={styles.button} type="button">
      Order now
    </button>
  </div>
);
