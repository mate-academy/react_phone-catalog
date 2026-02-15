import React from 'react';
import styles from './SectionTitle.module.scss';

type Props = {
  title: string;
};

export const SectionTitle: React.FC<Props> = ({ title }) => {
  return (
    <div className={styles['section-title']}>
      <h3>{title}</h3>
      <div className={styles['section-title__hr']}></div>
    </div>
  );
};
