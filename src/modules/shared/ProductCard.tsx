import React from 'react';
import { Product } from '../../types/Product';

import styles from './ProductCard.module.scss';
import { NavLink } from 'react-router-dom';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useCart } from '../../contexts/CartContext';
import { PriceView } from '../HomePage/components/ProductsSlider';

type Props = {
  product: Product;
  className?: string;
  priceView?: PriceView;
};

export const ProductCard: React.FC<Props> = ({
  product,
  className,
  priceView,
}) => {
  const { cart, toggleCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(product.id);
  const isProductInCart = cart.find(p => p.id === product.id) || 0;

  return (
    <div className={`${styles['product-card']} ${className || ''}`}>
      <NavLink to={`/${product.category}/${product.itemId}`}>
        <img src={product.image} className={styles['product-image']} />
        <p className={styles.title}>{product.name}</p>
      </NavLink>

      <div className={styles.prices}>
        {priceView === 'fullOnly' ? (
          <p className={styles.price}>${product.fullPrice}</p>
        ) : (
          <>
            <p className={styles.price}>${product.price}</p>
            {product.fullPrice !== product.price && (
              <p className={styles.fullPrice}>${product.fullPrice}</p>
            )}
          </>
        )}
      </div>

      <ul className={styles['option-list']}>
        <li className={styles['option-item']}>
          <p className={styles.option}>Screen</p>
          <p className={styles.value}>{product.screen}</p>
        </li>
        <li className={styles['option-item']}>
          <p className={styles.option}>Capacity</p>
          <p className={styles.value}>{product.capacity}</p>
        </li>
        <li className={styles['option-item']}>
          <p className={styles.option}>RAM</p>
          <p className={styles.value}>{product.ram}</p>
        </li>
      </ul>

      <div className={styles['buttons-wrapper']}>
        <button
          className={`${styles['add-to-cart']} ${isProductInCart ? styles.added : ''}`}
          onClick={() => toggleCart(product.id)}
        >
          {isProductInCart ? 'Added' : 'Add to cart'}
        </button>
        <button
          className={styles['add-to-favorite']}
          onClick={() => toggleFavorite(product.id)}
        >
          <img
            src={
              isFavorite
                ? 'img/icons/Favourites Filled (Heart Like).svg'
                : 'img/icons/Favourites (Heart Like).svg'
            }
            alt="Favourites"
          />
        </button>
      </div>
    </div>
  );
};
