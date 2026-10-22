import type React from 'react';
import type { ProductDescription } from '../../../../types/ProductDescription';
import styles from './AboutProduct.module.scss';

type Props = {
  description: ProductDescription[];
};

export const AboutProduct: React.FC<Props> = ({ description }) => {
  return (
    <div className={styles['about-product']}>
      <h3 className={styles.title}>About</h3>

      <div className={styles.divider}></div>

      {description.map(desc => (
        <div key={desc.title}>
          <h4 className={styles['sub-title']}>{desc.title}</h4>
          {desc.text.map(string => (
            <p key={string}>{string}</p>
          ))}
        </div>
      ))}
    </div>
  );
};
