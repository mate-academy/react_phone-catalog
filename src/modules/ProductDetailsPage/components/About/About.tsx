import React from 'react';
import { ProductDetails } from '../../../../types';
import styles from './About.module.scss';

type Props = {
  product: ProductDetails;
};

export const About = ({ product }: Props) => {
  return (
    <div className={styles.main}>
      <h2 className={styles.text}>About</h2>
      {product.description.map(item => (
        <div key={item.title}>
          <h3 className={styles.title}>{item.title}</h3>
          <div className={styles.paragraph}>
            {item.text.map(paragraph => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
