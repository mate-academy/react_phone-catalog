import React from 'react';
import styles from './ProductAbout.module.scss';

interface Props {
  description: { title: string; text: string[] }[];
}

export const ProductAbout: React.FC<Props> = ({ description }) => {
  return (
    <div className={styles.productAbout}>
      <h2 className={styles.title}>About</h2>

      {description.map((desc, index) => (
        <div key={index} className={styles.productDescription}>
          <h3 className={styles.subtitle}>{desc.title}</h3>

          {desc.text.map((paragraph, idx) => (
            <p key={idx} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};
