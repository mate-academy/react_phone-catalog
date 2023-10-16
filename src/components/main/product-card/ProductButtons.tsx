import classNames from 'classnames';
import { useContext } from 'react';

import { useLocalStorage } from '../../../helpers/LocalStorage';
import {
  CART_KEY, FAVORITES_KEY,
} from '../../../helpers/constants/StorageKeys';
import {
  FavoritesCountContext,
} from '../../../helpers/context/FavoritesCountContext';
import { Product } from '../../../helpers/types/Product';
import { ProductInCart } from '../../../helpers/types/ProductInCart';

type ProductButtonsProps = {
  product: Product
  areBig?: boolean
};

export const ProductButtons = ({ product, areBig }: ProductButtonsProps) => {
  const [
    getCartProducts,
    setCartProducts,
    cartContains,
  ] = useLocalStorage(CART_KEY);

  const [
    getFavoriteProducts,
    setFavoriteProducts,
    favoritesContains,
  ] = useLocalStorage(FAVORITES_KEY);

  const { increment, decrement } = useContext(FavoritesCountContext);

  const { id } = product;
  const inCart = cartContains(id);

  const buttonCartClasses = classNames('product-buttons__cart', {
    'product-buttons__cart--clicked': inCart,
    'product-buttons__cart--big': areBig,
  });
  const textCartClass = classNames('product-buttons__cart-text', {
    'product-buttons__cart-text--clicked': inCart,
  });
  const buttonCartText = inCart ? 'Added to cart' : 'Add to cart';
  const favoritesButtonClasses = classNames('product-buttons__favorites', {
    'product-buttons__favorites--big': areBig,
  });
  const favoritesImagePath = favoritesContains(id)
    ? 'img/favorites/heart-selected.svg'
    : 'img/favorites/heart.svg';

  const handleCartClick = () => {
    if (!cartContains(id)) {
      const productInCard: ProductInCart = {
        product,
        quantity: 1,
      };

      setCartProducts([...getCartProducts(), productInCard]);
    }
  };

  const handleFavoritesClick = () => {
    if (favoritesContains(id)) {
      setFavoriteProducts(
        [...getFavoriteProducts().filter(favorite => {
          return 'id' in favorite
            ? favorite.id !== id
            : favorite.product.id !== id;
        })],
      );
      decrement();
    } else {
      setFavoriteProducts([...getFavoriteProducts(), product]);
      increment();
    }
  };

  return (
    <div className="product-buttons">
      <button
        className={buttonCartClasses}
        type="button"
        onClick={handleCartClick}
      >
        <div className={textCartClass}>{buttonCartText}</div>
      </button>

      <button
        className={favoritesButtonClasses}
        type="button"
        onClick={handleFavoritesClick}
        data-cy="addToFavorite"
      >
        <img
          className="product-buttons__heart"
          src={favoritesImagePath}
          alt="Add to favorites"
        />
      </button>
    </div>
  );
};

ProductButtons.defaultProps = {
  areBig: false,
};
