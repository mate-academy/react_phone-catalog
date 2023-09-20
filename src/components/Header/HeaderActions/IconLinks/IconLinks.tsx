import { useContext } from 'react';

import { FavoriteContext } from '../../../../contexts/FavoriteContextProvider';
import cartIcon from '../../../../images/icons/icon-cart.svg';

import { CartContext } from '../../../../contexts/CartContextProvider';
import favoritesIcon from '../../../../images/icons/icon-favourites.svg';

import './IconLinks.scss';

type Props = {
  type: 'favorites' | 'cart',
};

export const IconLinks: React.FC<Props> = ({ type }) => {
  const images = {
    favorites: favoritesIcon,
    cart: cartIcon,
  };

  const { cart } = useContext(CartContext);
  const { favorites } = useContext(FavoriteContext);

  const contexts = {
    favorites,
    cart,
  };

  return (
    <div className="icon-links">
      <img
        src={images[type]}
        alt={type}
        className="icon-links__image"
      />
      {contexts[type].length > 0 && (
        <div className="icon-links--active">
          {contexts[type].length}
        </div>
      )}
    </div>
  );
};
