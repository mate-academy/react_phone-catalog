import React from 'react';
import styles from './ProductDescription.module.scss';
import '../../styles/App.scss';
import Spec from '../Spec';
import { ProductDetails } from '../../store/slices/productSlice';

const specKeys: Record<string, keyof ProductDetails> = {
  Screen: 'screen',
  Resolution: 'resolution',
  Processor: 'processor',
  RAM: 'ram',
  Capacity: 'capacity',
  Camera: 'camera',
  Zoom: 'zoom',
  Cell: 'cell',
};

type ProductDescriptionProps = {
  product: ProductDetails;
};

const ProductDescription: React.FC<ProductDescriptionProps> = ({ product }) => {
  return (
    <div className={styles['product-description']}>
      <div className={styles['product-description-about']}>
        <h3 className={styles['product-description-title']}>About</h3>

        {product.description.map((item, index) => (
          <div key={index} className={styles['product-description-content']}>
            <h4 className={styles['product-description-content-title']}>
              {item.title}
            </h4>
            <p className={styles['product-description-content-text']}>
              {item.text}
            </p>
          </div>
        ))}
      </div>

      <div className={styles['product-description-specs']}>
        <h3 className={styles['product-description-title']}>Tech specs</h3>
        <div className={styles['product-description-specs-content']}>
          {[
            'Screen',
            'Resolution',
            'Processor',
            'RAM',
            'Capacity',
            'Camera',
            'Zoom',
            'Cell',
          ].map((title, index) => {
            let description = product[specKeys[title]];

            if (Array.isArray(description)) {
              description = description.join(', ');
            }

            if (description !== undefined) {
              return (
                <Spec
                  key={index}
                  title={title}
                  description={String(description)}
                />
              );
            }

            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
