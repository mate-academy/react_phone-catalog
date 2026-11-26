import React from 'react';
import { DescriptionBlock } from '../../types/ProductDetails';
import styles from './ProductAbout.module.scss';

interface Props {
  description: DescriptionBlock[];
}

export const ProductAbout: React.FC<Props> = ({ description }) => {
  return (
    <div className={styles.about}>
      <h2 className={styles.about__title}>About</h2>

      {description.map(block => (
        <div key={block.title} className={styles.about__block}>
          <h3 className={styles.about__subtitle}>{block.title}</h3>

          {block.text.map(paragraph => (
            <p key={paragraph} className={styles.about__paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};
