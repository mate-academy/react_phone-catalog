import React from 'react';
import styles from './ProductDescription.module.scss';

type Description = {
  title: string;
  text: string[];
};

type Props = {
  description: Description[];
};

export const ProductDescription: React.FC<Props> = ({ description }) => {
  return (
    <div className={styles.description}>
      {description.map((section, index) => (
        <div key={index} className={styles.section}>
          <h3 className={styles.title}>{section.title}</h3>
          {section.text.map((line, i) => (
            <p key={i} className={styles.text}>
              {line}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};
