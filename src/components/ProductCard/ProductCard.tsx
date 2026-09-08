import React from 'react';
import styles from './ProductCard.module.scss';
import { Product } from '../../types/product';
import { Link } from 'react-router-dom';
import { ProductActions } from '../ProductActions';
import { ProductPrice } from '../ProductPrice';
import { useProductActions } from '../../modules/shared/hooks';

interface Props {
  product: Product;
  hideDiscount?: boolean;
}

export const ProductCard: React.FC<Props> = React.memo(function ProductCard({
  product,
  hideDiscount = false,
}) {
  const { productForAction, isInCart, isFavorited, handleCartClick, handleFavoriteClick } =
    useProductActions({ product, hideDiscount });

  const price = productForAction?.price ?? product.price;

  return (
    <div className={styles['product-card']}>
      <Link
        to={`/product/${product.itemId}`}
        state={hideDiscount ? { hideDiscount: true } : undefined}
        className={styles['product-card__image-wrapper']}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className={styles['product-card__image']}
        />
      </Link>

      <div className={styles['product-card__content']}>
        <p className={styles['product-card__title']}>
          <Link
            to={`/product/${product.itemId}`}
            state={hideDiscount ? { hideDiscount: true } : undefined}
          >
            {product.name}
          </Link>
        </p>

        <ProductPrice
          price={price}
          fullPrice={productForAction?.fullPrice}
          hideDiscount={hideDiscount}
          className={styles['product-card__prices']}
          currentClassName={styles['product-card__price-current']}
          oldClassName={styles['product-card__price-old']}
        />

        <div className={styles['product-card__divider']} />

        <div className={styles['product-card__specs']}>
          <p className={styles['product-card__spec-row']}>
            <span className={styles['product-card__spec-name']}>Screen</span>
            <span className={styles['product-card__spec-value']}>
              <span>{product.screen.split(' ')[0]}</span>
              <span>{product.screen.split(' ')[1]}</span>
            </span>
          </p>

          <p className={styles['product-card__spec-row']}>
            <span className={styles['product-card__spec-name']}>Capacity</span>
            <span className={styles['product-card__spec-value']}>
              <span>{product.capacity.replace('GB', '')}</span>
              <span>GB</span>
            </span>
          </p>

          <p className={styles['product-card__spec-row']}>
            <span className={styles['product-card__spec-name']}>RAM</span>
            <span className={styles['product-card__spec-value']}>
              <span>{product.ram.replace('GB', '')}</span>
              <span>GB</span>
            </span>
          </p>
        </div>

        <div className={styles['product-card__actions']}>
          <ProductActions
            isInCart={isInCart}
            isFavorited={isFavorited}
            onCartClick={handleCartClick}
            onFavoriteClick={handleFavoriteClick}
          />
        </div>
      </div>
    </div>
  );
});
