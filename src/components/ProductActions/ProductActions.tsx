import styles from './ProductActions.module.scss';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { addInCart } from '../../features/slices/cartSlice/cartSlice';
import { toggleFavorite } from '../../features/slices/favorites/favoritesSlice';
import union from '../../assets/icons/Union.svg';
import favorites from '../../assets/icons/Favourites.svg';
import { SecondaryButton } from '../SecondaryButton';
type Props = {
  itemId: string;
};

export const ProductActions: React.FC<Props> = ({ itemId }) => {
  const [pop, setPop] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const favoriteItems = useSelector(
    (state: RootState) => state.favorites.items,
  );
  const cartItems = useSelector((state: RootState) => state.cartList.items);

  const isFavorite = favoriteItems.includes(itemId);
  const isInCart = cartItems.some(item => item.itemId === itemId);

  const handleToggleCart = () => {
    dispatch(addInCart(itemId));
  };

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(itemId));
    setPop(false);
    requestAnimationFrame(() => setPop(true));
  };

  return (
    <div className={styles.productActions}>
      <button
        className={styles.productActions__add}
        onClick={handleToggleCart}
        disabled={isInCart}
      >
        {isInCart ? 'Added to cart' : 'Add to cart'}
      </button>
      <SecondaryButton
        size="m"
        aria-label="Add to favorites"
        onClick={handleToggleFavorite}
      >
        <img
          src={isFavorite ? union : favorites}
          alt="Hearts"
          className={[styles.iconImg, pop ? styles.iconPop : ''].join(' ')}
        />
      </SecondaryButton>
    </div>
  );
};
