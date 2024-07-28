import React from 'react';
import './ActionButtons.scss';
import '../../styles/utils/typography.scss';
import { useDispatch } from 'react-redux';
import {
  addProduct as addFavourite,
  takeProduct as removeFavourite,
} from '../../features/favouritesReducer';
import {
  addProduct as addCart,
  takeProduct as removeCart,
} from '../../features/cartReducer';
import { useAppSelector } from '../../app/hooks';
import { CartItem } from '../../types/CartItem';
import classNames from 'classnames';

type Props = {
  productId: string;
};

export const ActionButtons: React.FC<Props> = ({ productId }) => {
  const dispatch = useDispatch();

  const favourite: string[] = useAppSelector(state => state.favourite.items);
  const cart: CartItem[] = useAppSelector(state => state.cart.items);

  const addFavouriteItem = (favouriteToAdd: string) => () =>
    dispatch(addFavourite(favouriteToAdd));

  const removeFavouriteItem = (favouriteToRemove: string) => () =>
    dispatch(removeFavourite(favouriteToRemove));

  const addCartItem = (cartToAdd: CartItem) => () =>
    dispatch(addCart(cartToAdd));

  const removeCartItem = (cartToRemove: string) => () =>
    dispatch(removeCart(cartToRemove));

  const handleFavouriteClick = () => {
    if (favourite.includes(productId)) {
      removeFavouriteItem(productId)();
    } else {
      addFavouriteItem(productId)();
    }
  };

  const handleCartClick = () => {
    const cartItem = { id: productId, quantity: 1 };
    const cartItemExists = cart.some(item => item.id === productId);

    if (cartItemExists) {
      removeCartItem(cartItem.id)();
    } else {
      addCartItem(cartItem)();
    }
  };

  return (
    <div className="action">
      <button
        type="button"
        name="add-to-cart"
        className={classNames('add-to-cart-button action__button button', {
          'add-to-cart-button--active': cart.some(
            item => item.id === productId,
          ),
        })}
        onClick={handleCartClick}
      >
        {cart.some(item => item.id === productId) ? 'Added' : 'Add to cart'}
      </button>

      <button
        type="button"
        name="add-to-favourite"
        className="favourite-button action__button"
        onClick={handleFavouriteClick}
      >
        <img
          src={
            favourite.includes(productId)
              ? 'icons/Favourites-active.svg'
              : 'icons/Favourites.svg'
          }
          alt="Add to favourites"
          className="favourite-button__img"
        />
      </button>
    </div>
  );
};
