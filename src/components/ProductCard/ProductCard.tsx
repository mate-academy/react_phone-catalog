import React from 'react';
import { Product } from '../../types/Product';
import styles from './ProductCard.module.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import cartSlice from '../../features/cart/cartSlice';
import favoriteSlice from '../../features/favorite/favoriteSlice';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
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
    <div className={styles.container}>
      <div className={styles.img}>
        <img src={product.image} alt="phone" />
      </div>
      <h5>{product?.name}</h5>
      <div className={styles.price}>
        {product.price && <h3>{product.price}$</h3>}
        <h3 className={product.price ? styles.discount : ''}>
          {product.fullPrice}$
        </h3>
      </div>
      <span></span>
      <div className={styles.characteristic}>
        <p>Screen</p>
        <h6>{product?.screen}</h6>
      </div>
      <div className={styles.characteristic}>
        <p>Capacity</p>
        <h6>{product?.capacity}</h6>
      </div>
      <div className={styles.characteristic}>
        <p>RAM</p>
        <h6>{product?.ram}</h6>
      </div>
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
    </div>
  );
};
