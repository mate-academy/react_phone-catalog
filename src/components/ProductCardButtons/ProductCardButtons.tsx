import cn from 'classnames';

import { Product } from '../../types/Product';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import * as cartSlice from '../../features/cartSlice';
import * as favoritesSlice from '../../features/favoritesSlice';

import './ProductCardButtons.scss';

type Props = {
  product: Product,
};

export const ProductCardButtons: React.FC<Props> = ({
  product,
}) => {
  const dispatch = useAppDispatch();
  const { items: cart } = useAppSelector(state => state.cart);
  const { items: favorites } = useAppSelector(state => state.favorites);

  const isFavorite = favorites.some(item => item.itemId === product.itemId);
  const isInCart = cart.some(item => item.product.itemId === product.itemId);

  const handleToCartClick = () => {
    if (isInCart) {
      dispatch(cartSlice.remove(product));
    } else {
      dispatch(cartSlice.add(product));
    }
  };

  const handleToFavoritesClick = () => {
    if (isFavorite) {
      dispatch(favoritesSlice.remove(product));
    } else {
      dispatch(favoritesSlice.add(product));
    }
  };

  return (
    <div className="ProductCardButtons ProductCardButtons__container">
      <button
        type="button"
        className={cn('ProductCardButtons__button__cart', {
          'ProductCardButtons__button__cart--active': isInCart,
        })}
        onClick={handleToCartClick}
      >
        {isInCart ? (
          'Added to cart'
        ) : (
          'Add to cart'
        )}
      </button>
      <button
        type="button"
        aria-label="Add to Favorites"
        className="ProductCardButtons__button__fav"
        onClick={handleToFavoritesClick}
      >
        <div className={cn('ProductCardButtons__icon', {
          'icon--favourites': !isFavorite,
          'icon--favourites-fill': isFavorite,
        })}
        />
      </button>
    </div>
  );
};
