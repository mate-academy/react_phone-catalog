import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import {
  CartContext,
  FavouritesContext,
} from '../../store/SavedProductsContext';

import './SavedProductsButton.scss';

type ButtonType = 'favs' | 'cart';

type Props = {
  type: ButtonType;
};

const getPathname = (buttonType: ButtonType) => {
  switch (buttonType) {
    case 'favs':
      return '/favourites';
    case 'cart':
      return '/cart';
    default:
      return '/';
  }
};

export const SavedProductsButton: React.FC<Props> = ({ type }) => {
  const usePathname = getPathname(type);
  const { cartItems } = useContext(CartContext);
  const { favourites } = useContext(FavouritesContext);
  const productsAmount = type === 'cart'
    ? cartItems.length
    : favourites.length;

  const getLinkClass = ({ isActive }: { isActive: boolean }) => (
    classNames('SavedProductsButton',
      `SavedProductsButton--${type}`,
      {
        'SavedProductsButton--selected': isActive,
      }));

  return (
    <div className="SavedProductsButton__container">
      <NavLink to={usePathname} className={getLinkClass}>
        {productsAmount !== 0 && (
          <div key={productsAmount} className="SavedProductsButton__amount">
            {productsAmount}
          </div>
        )}
      </NavLink>
    </div>
  );
};
