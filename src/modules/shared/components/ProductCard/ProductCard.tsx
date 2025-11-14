import { FC } from 'react';
import { Link } from 'react-router-dom';

import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { Product } from '../../types/Product';
import { ButtonCart } from '../ButtonCart';
import { ButtonFavorite } from '../ButtonFavorite';

import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
};

export const ProductCard: FC<Props> = ({ product }) => {
  const { addToCart, cart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const inCart = cart.some(p => p.id === product.id);

  return (
    <article className={styles['product-card']}>
      <div className={styles['product-card__container']}>
        <Link
          to={`/${product.category}/${product.itemId}`}
          className={styles['product-card__link']}
        >
          <img
            className={styles['product-card__image']}
            src={product.image}
            alt={product.name}
          />
        </Link>

        <Link
          className={styles['product-card__title']}
          to={`/${product.category}/${product.itemId}`}
        >
          {product.name}
        </Link>

        <div className={styles['product-card__price']}>
          <span className={styles['product-card__price-discount']}>
            ${product.price}
          </span>

          <span className={styles['product-card__price-regular']}>
            ${product.fullPrice}
          </span>
        </div>

        <div className={styles['product-card__line']}></div>

        <div className={styles['product-card__properties']}>
          <div className={styles['product-card__property']}>
            <span className={styles['product-card__label']}>Screen</span>

            <span className={styles['product-card__value']}>
              {product.screen}
            </span>
          </div>

          <div className={styles['product-card__property']}>
            <span className={styles['product-card__label']}>Capacity</span>

            <span className={styles['product-card__value']}>
              {product.capacity}
            </span>
          </div>

          <div className={styles['product-card__property']}>
            <span className={styles['product-card__label']}>RAM</span>

            <span className={styles['product-card__value']}>{product.ram}</span>
          </div>
        </div>

        <div className={styles['product-card__buttons']}>
          <ButtonCart
            inCart={inCart}
            onClick={() => addToCart(product)}
            size="small"
          />

          <ButtonFavorite
            selected={isFavorite(product.itemId)}
            onClick={() => toggleFavorite(product)}
            size="small"
          />
        </div>
      </div>
    </article>
  );
};
