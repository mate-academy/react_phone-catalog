import { useContext } from 'react';
import classNames from 'classnames';
import {
  FavoritesContext,
  CartContext,
} from '../../helpers/SavedItemsContext';
import './ProductActionButtons.scss';

export const ProductActionButtons:React.FC<Product> = (props) => {
  const {
    id,
  } = props;
  const { cartItems, changeCartItems } = useContext(CartContext);
  const isInCart = cartItems.length > 0
    ? cartItems.find((product) => product.id === id) : false;
  const { favorites, changeFavItems } = useContext(FavoritesContext);
  const isInFavs = favorites.length > 0
    ? favorites.find((product) => product.id === id) : false;

  return (
    <div className="action-buttons__container">
      <button
        type="button"
        className={classNames(
          'dark-button',
          'action-buttons__to-cart',
          { 'dark-button--in-cart': isInCart },
        )}
        onClick={() => {
          changeCartItems(props);
        }}
      >
        {`${isInCart ? 'Added' : 'Add'} to cart`}
      </button>
      <button
        type="button"
        className={classNames(
          'button',
          { 'button--selected': isInFavs },
          'action-buttons__to-favs',
          { 'action-buttons__to-favs--in-favs': isInFavs },
        )}
        onClick={() => {
          changeFavItems(props);
        }}
      >
        {' '}
      </button>
    </div>
  );
};
