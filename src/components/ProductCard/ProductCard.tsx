import { Link, useLocation } from 'react-router-dom';
import styles from './ProductCard.module.scss';
import { Product } from '../../types/Product';
import React from 'react';
import { AddToCartButton } from '../AddToCartButton';
import { AddToFavsButton } from '../AddToFavsButton';
import cn from 'classnames';
import { useAppSelector } from '../../store/hooks';
import { TechList } from '../TechList';

type Props = {
  product: Product;
  isLoading?: boolean;
  showPrice?: boolean;
};

export const ProductCard: React.FC<Props> = ({ product, showPrice = true }) => {
  const { cart } = useAppSelector(state => state.cart);
  const { favourites } = useAppSelector(state => state.favourites);
  const { isDark } = useAppSelector(state => state.theme);

  const isSelected = cart.some(item => item.id === product.itemId);
  const isLiked = favourites.some(itemId => itemId === product.itemId);

  const { search } = useLocation();

  const properties = ['screen', 'capacity', 'RAM'];

  return (
    <article
      className={cn(styles.product, {
        [styles['product--loading']]: true,
        [styles['product--dark']]: isDark,
      })}
    >
      <div className={styles.product__content}>
        <Link
          to={`/${product.category}/${product.itemId}`}
          state={{ search: search }}
          className={styles.product__link}
        >
          <img
            src={`${product.image}`}
            alt={product.name}
            className={styles.product__img}
          />
        </Link>

        <p className={styles.product__title}>
          <Link
            to={`/${product.category}/${product.itemId}`}
            state={{ search: search }}
          >
            {product.name}
          </Link>
        </p>

        <div className={styles.product__price}>
          <h3>{product.price}</h3>
          {showPrice && (
            <p
              className={`crossed-price ${isDark ? 'crossed-price--dark' : ''}`}
            >
              {product.fullPrice}
            </p>
          )}
        </div>

        <div className={styles.product__divider} />

        <div className={styles['product__tech-list']}>
          <TechList parameters={properties} product={product} />
        </div>

        <div className={styles.product__interact}>
          <AddToCartButton isSelected={isSelected} itemId={product.itemId} />
          <AddToFavsButton itemId={product.itemId} isLiked={isLiked} />
        </div>
      </div>
    </article>
  );
};
