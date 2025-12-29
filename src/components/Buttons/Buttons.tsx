import React from "react";
import styles from './Buttons.module.scss';
import FavoritesIcon from '../../icons/favorites_icon.png';
import FavoritesActive from '../../icons/favorites_active.png';
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { useFavorites } from "../../context/FavoritesContext";

interface ButtonsProps {
  productId: string;
}

export const Buttons: React.FC<ButtonsProps> = ({ productId }) => {
  const { getItemQuantity, increaseItemQuantity } = useShoppingCart();
  const { toggleFavorite, favItems } = useFavorites();

  const isInCart = getItemQuantity(productId) > 0;
  const isInFav = favItems.some(item => item.id === productId);

  return (
    <div className={styles.buttons}>
      <button
        className={isInCart ? styles.buttons__cart__added : styles.buttons__cart}
        onClick={() => !isInCart && increaseItemQuantity(productId)}
        disabled={isInCart}
      >
        {isInCart ? 'Added' : 'Add to cart'}
      </button>
      <button
        className={`${styles.buttons__fav} ${isInFav ? styles.buttons__fav__added : ''}`}
        onClick={() => toggleFavorite(productId)}
      >
        <img
          src={isInFav ? FavoritesActive : FavoritesIcon}
          alt='Favorite'
          className={styles.buttons__fav__icon}
        />
      </button>
    </div>
  )
}
