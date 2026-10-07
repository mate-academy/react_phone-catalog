import React from 'react';
import styles from './EmptySearch.module.scss';

interface Props {
  message: string;
}

export const EmptySearch: React.FC<Props> = ({ message }) => {
  return (
    <div className={styles['empty-search']}>
      <p className={styles['empty-search__text']}>{message}</p>
    </div>
  );
};
