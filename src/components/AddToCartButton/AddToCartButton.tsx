import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Product } from '../../types/Product';
import styles from './AddToCartButton.module.scss';
import cartSlice from '../../features/cart/cartSlice';
import favoriteSlice from '../../features/favorite/favoriteSlice';

type Props = {
  product: Product;
};

export const AddToCartButton: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const { products: favoriteItems } = useAppSelector(state => state.favorite);
  const { products: cartItems } = useAppSelector(state => state.cart);

  const onAddToCart = (item: Product) => {
    dispatch(cartSlice.actions.addToCart(item));
  };

  const onAddToFavorite = (item: Product) => {
    dispatch(favoriteSlice.actions.addToFavorite(item));
  };

  const onIconChange = (): string => {
    const select = favoriteItems.find(item => item.id === product.id);

    if (select) {
      return '/img/servic/heart-fill.svg';
    } else {
      return '/img/servic/heart.svg';
    }
  };

  const onCartChange = (): string => {
    const select = cartItems.find(item => item.id === product.id);

    if (select) {
      return `${styles.buttonCart} ${styles.buttonCartActive}`;
    } else {
      return styles.buttonCart;
    }
  };

  const onButtonTitleChange = (): string => {
    const select = cartItems.find(item => item.id === product.id);

    if (select) {
      return 'Added to cart';
    } else {
      return 'Add to cart';
    }
  };

  return (
    <div className={styles.addToCartFavorite}>
      <button className={onCartChange()} onClick={() => onAddToCart(product)}>
        {onButtonTitleChange()}
      </button>
      <button
        className={styles.buttonFavorite}
        onClick={() => onAddToFavorite(product)}
      >
        <img src={onIconChange()} alt="heart" />
      </button>
    </div>
  );
};
