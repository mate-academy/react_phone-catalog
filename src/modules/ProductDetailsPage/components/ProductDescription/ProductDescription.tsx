import React from 'react';
import { ProductDetails } from '../../../shared/types/ProductDetails';
import styles from './ProductDescription.module.scss';
import classNames from 'classnames';

interface Props {
  product: ProductDetails;
}

export const ProductDescription: React.FC<Props> = ({ product }) => {
  return (
    <div className={styles.about}>
      <h3 className={styles.sectionTitle}>About</h3>

      {product.description.map((article, index) => (
        <div key={index} className={styles.articleContainer}>
          <h4>{article.title}</h4>
          <p className={classNames(styles.articleText, 'body-text')}>{article.text}</p>
        </div>
      ))}
    </div>
  );
};
