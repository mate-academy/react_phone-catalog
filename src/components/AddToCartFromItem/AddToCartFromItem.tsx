import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import styles from './AddToCartFromItem.module.scss';
import cartSlice from '../../features/cart/cartSlice';
import favoriteSlice from '../../features/favorite/favoriteSlice';
import { Item } from '../../types/Item';
import productItem from '../../../public/api/products.json';

type Props = {
  product: Item;
};

export const AddToCartFromItem: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const { products: favoriteItems } = useAppSelector(state => state.favorite);
  const { products: cartItems } = useAppSelector(state => state.cart);

  const onAddToCart = (id: string) => {
    const itemFromProduct = productItem.find(item => item.itemId === id);

    if (itemFromProduct) {
      dispatch(cartSlice.actions.addToCart(itemFromProduct));
    }
  };

  const onAddToFavorite = (id: string) => {
    const itemFromProduct = productItem.find(item => item.itemId === id);

    if (itemFromProduct) {
      dispatch(favoriteSlice.actions.addToFavorite(itemFromProduct));
    }
  };

  const onIconChange = (): string => {
    const select = favoriteItems.find(item => item.itemId === product.id);

    if (select) {
      return 'img/servic/heart-fill.svg';
    } else {
      return 'img/servic/heart.svg';
    }
  };

  const onCartChange = (): string => {
    const select = cartItems.find(item => item.itemId === product.id);

    if (select) {
      return `${styles.buttonCart} ${styles.buttonCartActive}`;
    } else {
      return styles.buttonCart;
    }
  };

  const onButtonTitleChange = (): string => {
    const select = cartItems.find(item => item.itemId === product.id);

    if (select) {
      return 'Added to cart';
    } else {
      return 'Add to cart';
    }
  };

  return (
    <div className={styles.addToCartFavorite}>
      <button
        className={onCartChange()}
        onClick={() => onAddToCart(product.id)}
      >
        {onButtonTitleChange()}
      </button>
      <button
        className={styles.buttonFavorite}
        onClick={() => onAddToFavorite(product.id)}
      >
        <img src={onIconChange()} alt="heart" />
      </button>
    </div>
  );
};
