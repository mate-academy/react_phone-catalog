import React from 'react';
import styles from '../Card/Card.module.scss';

type CardDetailProps = {
  label: string;
  value: string;
};

export const CardDetail: React.FC<CardDetailProps> = ({ label, value }) => {
  return (
    <div className={styles.card__details}>
      <p className="small-text">{label}</p>
      <p className="uppercase-text">{value}</p>
    </div>
  );
};
