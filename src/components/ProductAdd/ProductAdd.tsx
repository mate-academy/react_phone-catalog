/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../../helpers/app/hooks';
import { addToCart } from '../../helpers/features/cartSlice';
import { Product } from '../../helpers/types/Product';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../helpers/features/favoritesSlice';

import './ProductAdd.scss';

type Props = {
  product: Product,
};

export const ProductAdd: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector(state => state.favorites);
  const { cart } = useAppSelector(state => state.cart);

  const getIsFavorite = () => {
    return favorites.some(favorite => favorite.phoneId === product.phoneId);
  };

  const getIsInCart = () => {
    return cart.some(cartItem => cartItem.phoneId === product.phoneId);
  };

  const handleToggleFavorites = () => {
    const isFavorite = getIsFavorite();

    if (isFavorite) {
      dispatch(removeFromFavorites(product.phoneId));
    } else {
      dispatch(addToFavorites(product));
    }
  };

  const handleAddCartItem = () => {
    const isInCart = getIsInCart();

    if (!isInCart) {
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
        onClick={handleAddCartItem}
        disabled={getIsInCart()}
      >
        {getIsInCart() ? (
          <p>Added to cart</p>
        ) : (
          <p>Add to cart</p>
        )}
      </button>

      <button
        data-cy="addToFavorite"
        type="button"
        className={classNames('ProductAdd__favorites', {
          'ProductAdd__favorites--selected': getIsFavorite(),
        })}
        onClick={handleToggleFavorites}
      />
    </div>
  );
};
