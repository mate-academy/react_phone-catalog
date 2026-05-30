import React from 'react';
import styles from './ErrorComponent.module.scss';

type Props = {
  message: string;
};

export const ErrorComponent: React.FC<Props> = ({ message }) => (
  <div className={styles.errorContainer}>
    <p>{message}</p>
  </div>
);
