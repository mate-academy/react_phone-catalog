import React from 'react';
import styles from './Description.module.scss';

type Props = {
  title: string;
  texts: string[];
};

export const Description: React.FC<Props> = ({ title, texts }) => {
  return (
    <div className={styles.description}>
      <h4 className={styles.description__title}>{title}</h4>
      <div className={styles.description__container}>
        {texts.map(text => (
          <p className={styles.description__text} key={text}>
            {text}
          </p>
        ))}
      </div>
    </div>
  );
};
