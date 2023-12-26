import { useContext } from 'react';
import cn from 'classnames';

import './ProductCardButtons.scss';
import { AppContext } from '../../store/AppProvider';
import { Product } from '../../types/Product';

type Props = {
  productId: Product['itemId'],
};

export const ProductCardButtons: React.FC<Props> = ({
  productId,
}) => {
  const {
    favorites,
    cart,
    addToCart,
    removeFromCart,
    addToFavorites,
    takeFromFavorites,
  } = useContext(AppContext);

  const isFavorite = favorites.some(item => item.itemId === productId);
  const isInCart = cart.some(item => item.product.itemId === productId);

  const handleToCartClick = () => {
    if (isInCart) {
      removeFromCart(productId);
    } else {
      addToCart(productId);
    }
  };

  const handleToFavoritesClick = () => {
    if (isFavorite) {
      takeFromFavorites(productId);
    } else {
      addToFavorites(productId);
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
