import React from 'react';
import styles from '../Card/Card.module.scss';

type CardDetailProps = {
  label: string;
  value: string;
  inlineStyles?: React.CSSProperties;
};

export const CardDetail: React.FC<CardDetailProps> = ({
  label,
  value,
  inlineStyles,
}) => {
  return (
    <div className={styles.card__details}>
      <p className="small-text" style={inlineStyles}>
        {label}
      </p>
      <p className="uppercase-text" style={inlineStyles}>
        {value}
      </p>
    </div>
  );
};
