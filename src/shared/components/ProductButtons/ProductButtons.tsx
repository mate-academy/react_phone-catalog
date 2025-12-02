import React, { useContext } from 'react';
import { FavoriteContext } from '../../contexts/FavoriteContext';
import { CartContext, CartItem } from '../../contexts/CartContext';
import { Product } from '../../../types';
import styles from './ProductButtons.module.scss';

type Props = {
  product: Product;
};

export const ProductButtons: React.FC<Props> = ({ product }) => {
  const { favorites, setFavorites } = useContext(FavoriteContext);
  const { cartItems, setCartItems } = useContext(CartContext);

  const isFavorite = favorites.some(f => f.id === product.id);
  const isInCart = cartItems.some(c => c.id === product.id);

  const handleToggleFavorite = () => {
    if (!isFavorite) {
      setFavorites(prev => [...prev, product]);
    } else {
      setFavorites(prev => prev.filter(p => p.id !== product.id));
    }
  };

  const handleAddToCart = () => {
    if (!isInCart) {
      const newItem: CartItem = {
        id: product.id,
        quantity: 1,
        product,
      };

      setCartItems(prev => [...prev, newItem]);
    }
  };

  return (
    <div className={styles.buttons}>
      <button
        className={styles.addToCart}
        data-added={isInCart}
        onClick={handleAddToCart}
      >
        {isInCart ? 'Added' : 'Add to cart'}
      </button>

      <button
        className={styles.favoriteButton}
        data-selected={isFavorite}
        onClick={handleToggleFavorite}
      >
        <img
          src={
            isFavorite
              ? '/icons/heart_selected.svg'
              : '/icons/heart_default.svg'
          }
          alt="favorite"
        />
      </button>
    </div>
  );
};
