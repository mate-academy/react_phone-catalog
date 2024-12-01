import React, { useContext } from 'react';
import cn from 'classnames';
import { Product } from '../../types/Product';
import { FavouritesContext } from '../../store/FavouritesContex';
import { CartContext } from '../../store/CartContext';
import fav from '../../images/icons/favourites.svg';
import favHeard from '../../images/icons/favourites_heart.svg';
import styles from './Buttons.module.scss';

type Props = {
  product: Product;
};

export const Buttons: React.FC<Props> = ({ product }) => {
  const { favourites, handleFavourites } = useContext(FavouritesContext);
  const { cartProducts, addToCart } = useContext(CartContext);

  const { itemId } = product;

  const isFavourite = favourites.find(favItem => favItem.itemId === itemId);
  const isCartProducts = cartProducts.find(cartItem => cartItem.id === itemId);

  return (
    <>
      <div className={styles.button}>
        <button
          onClick={() => addToCart(product)}
          className={cn(styles.button__add, {
            [styles['button__add--active']]: isCartProducts,
          })}
        >
          {isCartProducts ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          className={styles.button__fav}
          onClick={() => handleFavourites(product)}
        >
          <img
            src={isFavourite ? favHeard : fav}
            alt="Favourites"
            className={styles['button__img-fav']}
          />
        </button>
      </div>
    </>
  );
};
