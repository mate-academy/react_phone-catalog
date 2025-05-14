import React from 'react';
import styles from './ProductCard.module.scss';
import { Product } from '@/types/product';

import { Link } from 'react-router-dom';
import { ProductPrice } from '@/components/UI/ProductPrice';
import { ProductCardButtons } from '../ProductCardButtons';
import { ProductCharacteristics } from '../ProductCharacteristics';

type Props = {
  product: Product;
  isShowFullPrice: boolean;
};

export const ProductCard: React.FC<Props> = ({ product, isShowFullPrice }) => {
  const characteristics: { key: keyof Product; name: string }[] = [
    { key: 'screen', name: 'Screen' },
    { key: 'capacity', name: 'Capacity' },
    { key: 'ram', name: 'RAM' },
  ];

  return (
    <div className={styles.productCard}>
      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles.wrapperProductDetails}
      >
        <img
          src={product.image}
          alt={product.name}
          className={styles.productImage}
        />
        <p className={styles.productName}>{product.name}</p>
      </Link>

      <ProductPrice isShowFullPrice={isShowFullPrice} product={product} />

      <ProductCharacteristics product={product} characteristics={characteristics} />

      <ProductCardButtons />
    </div>
  );
};
