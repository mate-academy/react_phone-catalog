import classNames from 'classnames';
import styles from './ActionButtons.module.scss';
import React, { useCallback, useContext } from 'react';
import { FavouriteContext } from '../../context/FavouriteProvider';
import { Product } from '../../types/Product';
import { CartContext } from '../../context/CartProvider';

interface Props {
  product: Product;
}

export const ActionButtons: React.FC<Props> = ({ product }) => {
  const { favourites, addFavouriteProduct, removeFavouriteProduct } =
    useContext(FavouriteContext);

  const { cartProducts, addCartProduct, removeCartProduct } =
    useContext(CartContext);

  const isFavourite = favourites.some(
    favourite => favourite.itemId === product.itemId,
  );

  const isCartProduct = cartProducts.some(
    cartProduct => cartProduct.itemId === product.itemId,
  );

  const handleFavouriteProduct = () => {
    return isFavourite
      ? removeFavouriteProduct(product.itemId)
      : addFavouriteProduct(product);
  };

  const handleCartProduct = useCallback(() => {
    return isCartProduct
      ? removeCartProduct(product.itemId)
      : addCartProduct(product);
  }, [isCartProduct, removeCartProduct, addCartProduct, product]);

  return (
    <div className={styles['action-buttons']}>
      <button
        className={classNames(styles['action-buttons__button'], 'button', {
          [styles['action-buttons__button--selected']]: isCartProduct,
        })}
        onClick={handleCartProduct}
        title={isCartProduct ? 'Remove from cart' : 'Add to cart'}
      >
        {isCartProduct ? 'Added to cart' : 'Add to cart'}
      </button>
      <button
        className={classNames(styles['action-buttons__favourite'], 'icon', {
          'icon--like': !isFavourite,
          'icon--favourite': isFavourite,
          [styles['action-buttons__favourite--active']]: isFavourite,
        })}
        onClick={handleFavouriteProduct}
        title={isCartProduct ? 'Remove from favourites' : 'Add to favourites'}
      ></button>
    </div>
  );
};
