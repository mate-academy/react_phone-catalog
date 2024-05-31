import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import cn from 'classnames';

import {
  handleLocalStorage,
  localeStorageHandler,
} from '../../../utils/helpers/helpers';
import { Product } from '../../../types/Product';

import { actions as productsActions } from '../../../store/reducers/products';

interface Props {
  product: Product;
  cartClasses: string[];
  favoritesClasses: string[];
}

export const Buttons: React.FC<Props> = ({
  product,
  cartClasses,
  favoritesClasses,
}) => {
  const dispatch = useAppDispatch();
  const { favorites, cart } = useAppSelector(state => state.products);

  /* local storage start */

  const displayedFavorites = useMemo(() => {
    return handleLocalStorage('favorites');
  }, [favorites]);

  const displyedCartItems = useMemo(() => {
    return handleLocalStorage('cart');
  }, [cart]);

  /* local storage end */

  const isInCart = (item: Product) => {
    return cart.some((cartItem: Product) => {
      return cartItem.id === item.id;
    });
  };

  /* handler functions start */

  const addFavorite = (value: Product) => {
    localeStorageHandler.add('favorites', displayedFavorites, value);

    dispatch(productsActions.addFavorite(value));
  };

  const removeFavorite = (valueId: string) => {
    localeStorageHandler.remove('favorites', displayedFavorites, valueId);

    dispatch(productsActions.removeFavorite(valueId));
  };

  const addToCart = (value: Product) => {
    if (!isInCart(value)) {
      localeStorageHandler.add('cart', displyedCartItems, value);
      dispatch(productsActions.addToCart(value));
    }
  };

  const removeFromCart = (valueId: string) => {
    localeStorageHandler.remove('cart', displayedFavorites, valueId);

    dispatch(productsActions.removeFromCart(valueId));
  };

  /* eslint-disable */
  const handleFavorites = (value: Product) => {
    displayedFavorites.some((favorite: Product) => favorite.id === value.id)
      ? removeFavorite(value?.id)
      : addFavorite(value);
  };

  const handleCart = (value: Product) => {
    displyedCartItems.some((item: Product) => item.id === value.id)
      ? removeFromCart(value?.id)
      : addToCart(value);
  };

  /* eslint-enable */
  /* handler functions end */

  return (
    <>
      <button
        className={cn(cartClasses[0], {
          [cartClasses[1]]: isInCart(product),
        })}
        onClick={() => handleCart(product)}
      >
        {isInCart(product) ? 'Added' : 'Add to cart'}
      </button>

      <button
        className={cn(favoritesClasses[0], {
          [favoritesClasses[1]]: displayedFavorites.some(
            (favorite: Product) => favorite.id === product.id,
          ),
        })}
        onClick={() => handleFavorites(product)}
      />
    </>
  );
};
