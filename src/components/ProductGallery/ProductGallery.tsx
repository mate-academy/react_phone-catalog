import React from 'react';
import { Product } from '../../types/Product';
import styles from './ProductGallery.module.scss';
import { ProductCard } from '../ProductCard';

type ProductGalleryProps = {
  products: Product[];
  discount?: boolean;
};

export const ProductGallery: React.FC<ProductGalleryProps> = React.memo(
  ({ products, discount }) => {
    return (
      <div className={styles.productGallery}>
        <ul className={styles.list}>
          {products.map(product => (
            <li className={styles.item} key={product.id}>
              <ProductCard product={product} discount={discount} />
            </li>
          ))}
        </ul>
      </div>
    );
  },
);

ProductGallery.displayName = 'ProductGallery';
