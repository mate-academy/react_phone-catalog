import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import {
  FavoritesContext,
  CartContext,
} from '../../helpers/SavedItemsContext';
import './SavedProductsButton.scss';

type ButtonType = 'favs' | 'cart';

type Props = {
  type: ButtonType,
};

const getPathname = (type: ButtonType) => {
  switch (type) {
    case 'favs':
      return '/favorites';
    case 'cart':
      return '/cart';
    default:
      return '/';
  }
};

export const SavedProductsButton: React.FC<Props> = ({
  type,
}) => {
  const { pathname } = useLocation();
  const usePathname = getPathname(type);
  const { cartItems } = useContext(CartContext);
  const { favorites } = useContext(FavoritesContext);
  const productsAmount = type === 'cart'
    ? cartItems.length
    : favorites.length;

  return (
    <div className={classNames(
      'saved-products-container',
    )}
    >
      <Link
        type="button"
        to={usePathname}
        className={classNames(
          'saved-products',
          `saved-products--${type}`,
          { 'saved-products--selected': pathname === usePathname },
        )}
      />
      {productsAmount !== 0 && (
        <div key={productsAmount} className="saved-products__amount">
          {productsAmount}
        </div>
      )}
    </div>
  );
};
