import React from 'react';
import styles from './Description.module.scss';
import { DescriptionItem } from '../../../../../../types/DescriptionItem';

export const Description: React.FC<DescriptionItem> = ({ title, text }) => {
  return (
    <div className={styles.description}>
      <div className={styles.description__container}>
        <div className={styles.description__title}>{title}</div>
        <div className={styles.description__texts}>
          {text.map((item, index) => (
            <div key={index} className={styles.description__text}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
