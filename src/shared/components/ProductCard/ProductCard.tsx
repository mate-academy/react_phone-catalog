import React, { useContext } from 'react';
import styles from './ProductCard.module.scss';
import { FavoriteContext } from '../../contexts/FavoriteContext';
import { CartContext, CartItem } from '../../contexts/CartContext';
import { Link } from 'react-router-dom';
import { Product } from '../../../types';

import heartDefaultIcon from '../../../assets/icons/heart_default.svg';
import heartSelectedIcon from '../../../assets/icons/heart_selected.svg';

type Props = {
  product: Product;
  showOldPrice: boolean;
};

export const ProductCard: React.FC<Props> = ({ product, showOldPrice }) => {
  const { favorites, setFavorites } = useContext(FavoriteContext);
  const { cartItems, setCartItems } = useContext(CartContext);

  const favorite = favorites.some(e => e.id === product.id);
  const hasCartItem = cartItems.some(item => item.id === product.id);

  function handleToggleFavorite() {
    if (!favorite) {
      setFavorites(prev => [...prev, product]);
    } else {
      setFavorites(prev => prev.filter(p => product.id !== p.id));
    }
  }

  function handleAddToCart() {
    if (!hasCartItem) {
      const newCartItem: CartItem = {
        id: product.id,
        quantity: 1,
        product,
      };

      setCartItems(prev => [...prev, newCartItem]);
    }
  }

  return (
    <article className={styles.card}>
      <Link to={`/product/${product.itemId}`} className={styles.imageWrapper}>
        <img
          src={`${import.meta.env.BASE_URL}${product.image}`}
          alt={product.name}
          className={styles.image}
        />
      </Link>

      <h3 className={styles.title}>
        <Link to={`/product/${product.itemId}`}>{product.name}</Link>
      </h3>

      <div className={styles.priceBlock}>
        <span className={styles.price}>${product.price}</span>
        {showOldPrice && (
          <span className={styles.oldPrice}>${product.fullPrice}</span>
        )}
      </div>

      <hr className={styles.divider} />

      <ul className={styles.details}>
        <li>
          <span>Screen</span>
          <span>{product.screen}</span>
        </li>
        <li>
          <span>Capacity</span>
          <span>{product.capacity}</span>
        </li>
        <li>
          <span>RAM</span>
          <span>{product.ram}</span>
        </li>
      </ul>

      <div className={styles.buttons}>
        <button
          data-added={hasCartItem}
          className={styles.addToCart}
          onClick={handleAddToCart}
        >
          {hasCartItem ? 'Added' : 'Add to cart'}
        </button>

        <button
          data-selected={favorite}
          className={styles.favorite}
          onClick={handleToggleFavorite}
        >
          <img
            src={favorite ? heartSelectedIcon : heartDefaultIcon}
            alt={favorite ? 'Remove from favorites' : 'Add to favorites'}
          />
        </button>
      </div>
    </article>
  );
};
