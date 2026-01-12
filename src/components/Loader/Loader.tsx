import React from 'react';
import styles from './Loader.module.scss';
import classNames from 'classnames';

export const Loader: React.FC = () => (
  <div className={styles.loader}>
    <div
      className={classNames(styles.loader__ball, styles['loader__ball--1'])}
    />
    <div
      className={classNames(styles.loader__ball, styles['loader__ball--2'])}
    />
    <div
      className={classNames(styles.loader__ball, styles['loader__ball--3'])}
    />
  </div>
);
