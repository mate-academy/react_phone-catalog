import React from 'react';
import { ProductDetails } from '../../../../types/Product';
import styles from './ProductAbout.module.scss';

type Props = {
  productDetails: ProductDetails;
};

export const ProductAbout: React.FC<Props> = ({ productDetails }) => {
  return (
    <div className={styles.sectionAbout}>
      <h2 className={styles.title}>About</h2>
      {productDetails.description.map(item => (
        <div key={item.title} className={styles.block}>
          <h3 className={styles.subtitle}>{item.title}</h3>
          {item.text.map((paragraph, ind) => (
            <p key={ind} className={styles.text}>
              {paragraph}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};
