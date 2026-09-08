import styles from './ProductCard.module.scss';

import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import { Product } from '../../types/Product';

import { AddToCartButton } from '../AddToCartButton';
import { FavouriteButton } from '../FavouriteButton';
import { ProductTechInfo } from '../ProductTechInfo';

type Props = {
  product: Product;
  hasDiscount: boolean;
};

export const ProductCard: React.FC<Props> = memo(({ product, hasDiscount }) => {
  const { name, fullPrice, price, image, category, itemId } = product;

  return (
    <article className={styles.productCard}>
      <Link
        to={`/${category}/${itemId}`}
        className={styles.productCard__imageNameLink}
      >
        <div className={styles.productCard__imageWrapper}>
          <img src={image} alt="" className={styles.productCard__image} />
        </div>

        <h3 className={styles.productCard__name}>{name}</h3>
      </Link>
      <div className={styles.productCard__prices}>
        {hasDiscount ? (
          <>
            <span className={styles.productCard__price}>${price}</span>
            <span className={styles.productCard__fullPrice}>${fullPrice}</span>
          </>
        ) : (
          <span className={styles.productCard__price}>${fullPrice}</span>
        )}
      </div>
      <div className={styles.productCard__techInfo}>
        <ProductTechInfo product={product} variant="short" />
      </div>
      <div className={styles.productCard__buttonsWrapper}>
        <AddToCartButton productData={product} />
        <FavouriteButton productData={product} />
      </div>
    </article>
  );
});

ProductCard.displayName = 'ProductCard';
