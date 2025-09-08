/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from 'react';
import styles from './ProductCart.module.scss';
import {
  Product,
  ProductCardProps,
} from '../../../public/api/types/ProductCard';
import { useShop } from '../ShopContext';
import { ThemeContext } from '../../utils/themeContext';
import { Theme } from '../../../public/api/types/theme';
import { useNavigate, useLocation } from 'react-router-dom';

type Props = ProductCardProps & { isLiked?: boolean };

export const ProductCart: React.FC<Props> = ({
  product,
  priceMode = 'both',
}) => {
  const discount =
    product.fullPrice > 0
      ? (product.fullPrice - product.price) / product.fullPrice
      : 0;
  const showBoth = priceMode === 'both' && discount >= 0.1;
  const { state, addToCart, toggleLike } = useShop();
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate(`/${product.category}/${product.itemId}`, {
      state: {
        from: location.pathname + location.search,
      },
    });
  };

  const onAddToCart = (p: Product) => addToCart(p);
  const onLike = (p: Product) => toggleLike(p);

  const isLiked = Boolean(state.favorites?.[product.itemId]);
  const isInCart = Boolean((state as any).cart?.[product.itemId]);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isInCart) {
      onAddToCart(product);
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onLike(product);
  };

  return (
    <div className={styles.linkReset} onClick={handleClick}>
      <article
        className={[
          styles.models__product,
          styles.product,
          theme === Theme.LIGHT ? styles['product--light'] : '',
        ].join(' ')}
        key={product.id}
      >
        <div className={styles.product__img}>
          <img
            src={product.image}
            alt="new model"
            className={styles.product__photo}
          />
        </div>
        <h3 className={styles.product__title}>{product.name} </h3>
        <div className={styles.product__priceBlock}>
          {showBoth ? (
            <>
              <h3 className={styles.product__price}>${product.price}</h3>
              <h3
                className={`${styles.product__fullPrice} ${styles['product__fullPrice--old']}`}
              >
                ${product.fullPrice}
              </h3>
            </>
          ) : (
            <h3 className={styles.product__price}>${product.fullPrice}</h3>
          )}
        </div>
        <dl className={styles.product__specs}>
          <div className={styles.product__specItem}>
            <dt className={styles.product__specs__dt}>Screen</dt>
            <dd className={styles.product__specs__dd}>{product.screen}</dd>
          </div>
          <div className={styles.product__specItem}>
            <dt className={styles.product__specs__dt}>Capacity</dt>
            <dd className={styles.product__specs__dd}>{product.capacity}</dd>
          </div>
          <div className={styles.product__specItem}>
            <dt className={styles.product__specs__dt}>RAM</dt>
            <dd className={styles.product__specs__dd}>{product.ram}</dd>
          </div>
        </dl>
        <div className={styles.product__actions}>
          <button
            className={styles.product__button}
            disabled={isInCart}
            aria-disabled={isInCart}
            onClick={handleAdd}
          >
            {isInCart ? 'Added' : 'Add to cart'}
          </button>
          <button
            type="button"
            className={styles.product__like__button}
            aria-pressed={isLiked}
            onClick={handleLike}
          >
            <span className={styles.product__butImg} aria-hidden="true" />
          </button>
        </div>
      </article>
    </div>
  );
};
