import { useCallback, useState } from 'react';

import {
  addToFavorites,
  removeFromFavorites,
} from '../../features/favorites/favoriteSlice';
import { addToCart, removeFromCart } from '../../features/cart/cartSlice';

import { useAppDispatch, useAppSelector } from '../../hooks';

import { Product } from '../../types/Product';

import styles from './ProductActions.module.scss';
const {
  buttons,
  buttons__cart,
  buttons__favourite,
  buttons__favImg,
  buttons__isInCart,
  buttons__isInFavorites,
} = styles;

type productActionsProps = {
  product: Product;
};

export const ProductActions = ({ product }: productActionsProps) => {
  const dispatch = useAppDispatch();

  const { favoriteItems } = useAppSelector((state) => state.favorites);
  const { cartItems } = useAppSelector((state) => state.cart);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const isInFavorites = favoriteItems.some((item) => item.id === product.id);
  const isInCart = cartItems.some((item) => item.product.id === product.id);

  const handleAdding = useCallback(
    (type: 'fav' | 'cart') => {
      if (isButtonDisabled) return;

      setIsButtonDisabled(true);

      if (type === 'fav') {
        if (isInFavorites) {
          dispatch(removeFromFavorites(product.id));
        } else {
          dispatch(addToFavorites(product));
        }
      } else if (type === 'cart') {
        if (isInCart) {
          dispatch(removeFromCart(product.id));
        } else {
          dispatch(addToCart(product));
        }
      }

      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 400);
    },
    [dispatch, isButtonDisabled, isInFavorites, isInCart, product],
  );

  const cartButtonText = isInCart ? 'Added' : 'Add to cart';
  const favImgSrc = isInFavorites
    ? `${import.meta.env.BASE_URL}icons/fav-heart.svg`
    : `${import.meta.env.BASE_URL}icons/emty-heart.svg`;

  return (
    <div className={buttons}>
      <button
        className={`${buttons__cart} ${isInCart ? buttons__isInCart : ''}`}
        onClick={() => handleAdding('cart')}
        disabled={isButtonDisabled}
        aria-label={isInCart ? 'Remove from cart' : 'Add to cart'}
      >
        {cartButtonText}
      </button>

      <button
        className={`${buttons__favourite} ${isInFavorites ? buttons__isInFavorites : ''}`}
        onClick={() => handleAdding('fav')}
        disabled={isButtonDisabled}
        aria-label={
          isInFavorites ? 'Remove from favorites' : 'Add to favorites'
        }
      >
        <img src={favImgSrc} alt="" className={buttons__favImg} />
      </button>
    </div>
  );
};
