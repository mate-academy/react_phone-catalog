import React from 'react';
import styles from './ProductAbout.module.scss';
import { Phone } from '../../../../types/Phone';

type Props = {
  product: Phone;
};

export const ProductAbout: React.FC<Props> = ({ product }) => {
  return (
    <div className={styles.productabout}>
      <div className={styles.productabout__title}>
        <h3>About</h3>
        <div className={styles.productabout__line}></div>
      </div>
      {product.description.map((description, index) => (
        <div key={index} className={styles.productabout__description}>
          <h4>{description.title}</h4>
          <p style={{ color: '#89939A' }} className="body-text">
            {description.text.map((line, i) => (
              <span key={i}>
                {line}
                <br />
                <br />
              </span>
            ))}
          </p>
        </div>
      ))}
    </div>
  );
};
