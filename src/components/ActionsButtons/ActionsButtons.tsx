import classNames from 'classnames';
import styles from './ActionsButtons.module.scss';
import { Product } from '../../types/Product';
import React, { useContext } from 'react';
import { FavoritesContext } from '../../context/FavoriteProvider';
import { CartContext } from '../../context/CartProvider';

type Props = {
  product: Product;
};

export const ActionsButtons: React.FC<Props> = ({ product }) => {
  const { favorites, addFavoriteProduct, removeFafouriteProduct } =
    useContext(FavoritesContext);

  const { cartProducts, addCartProducts } = useContext(CartContext);

  const isFafourite = favorites.some(
    favorite => favorite.itemId === product.itemId,
  );

  const isCartProduct = cartProducts.some(
    cartProduct => cartProduct.itemId === product.itemId,
  );

  const handleChangeFavorite = () => {
    return isFafourite
      ? removeFafouriteProduct(product.itemId)
      : addFavoriteProduct(product);
  };

  return (
    <div className={classNames(styles['actions-buttons'])}>
      <button
        className={classNames(styles['actions-buttons__button'], 'button', {
          [styles['actions-buttons__button--selected']]: isCartProduct,
        })}
        onClick={() => addCartProducts(product)}
      >
        {isCartProduct ? 'Added to cart' : 'Add to cart'}
      </button>
      <button
        className={classNames(styles['actions-buttons__favorite'], 'icon', {
          'icon--like': !isFafourite,
          'icon--heart-red': isFafourite,
        })}
        onClick={handleChangeFavorite}
      ></button>
    </div>
  );
};
