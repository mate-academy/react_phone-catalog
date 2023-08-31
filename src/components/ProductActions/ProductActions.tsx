import { useContext } from 'react';
import classnames from 'classnames';
import { Product } from '../../types/Product';
import {
  CartContext,
  FavouritesContext,
} from '../../store/SavedProductsContext';

import './ProductActions.scss';

export type Props = {
  product: Product;
};

export const ProductActions: React.FC<Props> = ({ product }) => {
  const { cartItems, changeCartItems } = useContext(CartContext);
  const isInCart = cartItems.length > 0
    ? cartItems.find((item) => item.id === product.id) : false;

  const { favourites, changeFavItems } = useContext(FavouritesContext);
  const isInFavs = favourites.length > 0
    ? favourites.find(item => item.id === product.id) : false;

  const handleCartClick = () => {
    changeCartItems(product);
  };

  const handleFavClick = () => {
    changeFavItems(product);
  };

  return (
    <div className="ProductActions">
      <button
        type="button"
        className={classnames(
          'ProductActions__cart-button',
          { 'ProductActions__cart-button--in-cart ': isInCart },
        )}
        onClick={handleCartClick}
      >
        {`${isInCart ? 'Added' : 'Add'} to cart`}
      </button>
      <button
        type="button"
        data-cy="addToFavorite"
        className={classnames(
          'ProductActions__fav-button',
          { 'ProductActions__fav-button--in-favs': isInFavs },
        )}
        onClick={handleFavClick}
      >
        {' '}
      </button>
    </div>
  );
};
