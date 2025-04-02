import classNames from 'classnames';
import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useCart } from '../../store/CartContext';
import { useFavourites } from '../../store/FavouritesContext';
import { Product } from '../../types/Product';
import styles from './AddAndLikeButtons.module.scss';

interface Props {
  product: Product;
}

export const AddAndLikeButtons: React.FC<Props> = ({ product }) => {
  const location = useLocation().pathname.split('/').length;
  const { state: cartState, dispatch: cartDispatch } = useCart();
  const { state: favouritesState, dispatch: favouritesDispatch } =
    useFavourites();
  const isInCart = useMemo(
    () => cartState.products.some(p => p.itemId === product.itemId),
    [cartState.products, product],
  );
  const isInFavourites = useMemo(
    () => favouritesState.products.some(p => p.itemId === product.itemId),
    [favouritesState.products, product],
  );

  const handleAdded = () => {
    if (isInCart) {
      cartDispatch({ type: 'REMOVE_PRODUCT', payload: { id: product.id } });
    } else {
      cartDispatch({ type: 'ADD_PRODUCT', payload: product });
    }
  };

  const handleLiked = () => {
    if (isInFavourites) {
      favouritesDispatch({
        type: 'REMOVE_PRODUCT',
        payload: { id: product.id },
      });
    } else {
      favouritesDispatch({ type: 'ADD_PRODUCT', payload: product });
    }
  };

  return (
    <div className={styles.buttons}>
      <button
        className={classNames(
          styles.buttons__button,
          styles['buttons__button--add'],
          {
            [styles['buttons__button--added']]: isInCart,
          },
        )}
        style={location === 3 ? { height: '48px' } : { height: '40px' }}
        onClick={handleAdded}
        aria-label={`${isInCart ? 'Remove' : 'Add to cart'}`}
      >
        {isInCart ? 'Remove' : 'Add to cart'}
      </button>
      <button
        className={classNames(
          styles.buttons__button,
          styles['buttons__button--like'],
          {
            [styles['buttons__button--liked']]: isInFavourites,
          },
        )}
        style={location === 3 ? { width: '48px' } : { width: '40px' }}
        onClick={handleLiked}
        aria-label="add or delete favourites"
      ></button>
    </div>
  );
};
