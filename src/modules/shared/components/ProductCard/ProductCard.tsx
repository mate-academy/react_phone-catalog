import React from 'react';
import { Link } from 'react-router-dom';

import {
  Product,
  ProductKeys,
  ProductWithDetails,
} from '../../../../_types/products';
import styles from './ProductCard.module.scss';
import ProductSpecs from '../ProductSpecs/ProductSpecs';
import { AddToCardButton } from '../AddToCardButton';
import { DividedLine } from '../DividedLine';

type Props = {
  product: ProductWithDetails | Product;
  isShowfullPrice?: boolean;
};

const ProductCard: React.FC<Props> = ({
  product,
  isShowfullPrice: fullPrice = false,
}) => {
  const specKeys: ProductKeys[] = ['screen', 'capacity', 'ram'];

  return (
    <div className={styles['product-card']}>
      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles['product-card__image-wrapper']}
      >
        <img
          alt={`Image of ${product.name}`}
          src={product.image}
          className={styles['product-card__image']}
        />
      </Link>
      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles['product-card__title']}
      >
        {product.name}
      </Link>
      <div className={styles['product-card__prices']}>
        <h3 className={styles['product-card__price']}> &#36;{product.price}</h3>
        {fullPrice && (
          <div className={styles['product-card__full-price']}>
            &#36;{product.fullPrice}
          </div>
        )}
      </div>
      <DividedLine />
      <ProductSpecs product={product} keys={specKeys} />
      <AddToCardButton product={product} height="40" />
    </div>
  );
};

export default React.memo(ProductCard);
