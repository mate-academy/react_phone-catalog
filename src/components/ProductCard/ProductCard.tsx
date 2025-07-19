import React from 'react';
import { Link } from 'react-router-dom';

import { Product } from '../../types/Product';
import { ProductTitle } from '../ProductTitle/ProductTitle';
import { ProductImage } from './components/ProductImage/ProductImage';
import { ProductPrice } from '../ProductPrice/ProductPrice';
import { ProductSpecs } from '../ProductSpecs/ProductSpecs';
import { ProductActions } from '../ProductActions';

import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
  showFullPrice?: boolean;
};

export const ProductCard: React.FC<Props> = ({
  product,
  showFullPrice = true,
}) => {
  const { name, category, itemId, image, price, fullPrice, id } = product;

  return (
    <div className={styles.card}>
      <Link to={`/${category}/${itemId}`} className={styles.link}>
        <ProductImage src={image} alt={name} />
        <ProductTitle title={name} id={id} />
      </Link>

      <ProductPrice
        price={price}
        fullPrice={fullPrice}
        showFullPrice={showFullPrice}
      />

      <div className={styles.separator} />

      <ProductSpecs product={product} view="card" />
      <ProductActions productId={id} />
    </div>
  );
};
