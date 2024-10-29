import React from 'react';
import styles from './hotPrice.module.scss';
import classNames from 'classnames';

export const HotPrice: React.FC = () => {
  return (
    <section className={classNames(styles.price, 'container')}>
      <h3 className={styles.price_title}>Hot prices</h3>
    </section>
  );
};
