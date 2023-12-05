/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';

import './ProductAdd.scss';
import { useAppDispatch, useAppSelector } from '../../helpers/app/hooks';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../helpers/features/favoritesSlice';

import {
  addToCart,
  removeFromCart,
} from '../../helpers/features/cartSlice';
import { Product } from '../../helpers/types/Product';

type Props = {
  product: Product,
};

export const ProductAdd: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector(state => state.favorites);
  const { cart } = useAppSelector(state => state.cart);

  const getIsFavorite = () => {
    return favorites.some(favorite => favorite.id === product.id);
  };

  const getIsInCart = () => {
    return cart.some(cartItem => cartItem.id === product.id);
  };

  const handleToggleFavorites = () => {
    const isFavorite = getIsFavorite();

    if (isFavorite) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites(product));
    }
  };

  const handleToggleCartItem = () => {
    const isInCart = getIsInCart();

    if (isInCart) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(addToCart(product));
    }
  };

  return (
    <div className="ProductAdd">
      <button
        type="button"
        className={classNames('ProductAdd__cart', {
          'ProductAdd__cart--selected': getIsInCart(),
        })}
        onClick={handleToggleCartItem}
      >
        {getIsInCart() ? (
          <p>Added to cart</p>
        ) : (
          <p>Add to cart</p>
        )}
      </button>

      <button
        type="button"
        className={classNames('ProductAdd__favorites', {
          'ProductAdd__favorites--selected': getIsFavorite(),
        })}
        data-cy="addToFavorite"
        onClick={handleToggleFavorites}
      />
    </div>
  );
};
