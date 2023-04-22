import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import './Shopbar.scss';

import { FavoritesContext } from '../../../contexts/FavoritesContext';
import { CartContext } from '../../../contexts/CartContext';

import ShopbarSearch from './ShopbarSearch/ShopbarSearch';
import ShopbarItemDyn from './ShopbarItemDyn/ShopbarItemDyn';

const searchAvailableIn = [
  '/phones',
  '/tablets',
  '/accessories',
  '/favorites',
];

const Shopbar = () => {
  const { favorites } = useContext(FavoritesContext);
  const { cart } = useContext(CartContext);
  const location = useLocation();
  const searchIsAvailable = searchAvailableIn.includes(location.pathname);

  return (
    <nav className="shopbar">
      <ul className="shopbar__list">
        {searchIsAvailable && (
          <li className="shopbar__item shopbar__item-search">
            <ShopbarSearch />
          </li>
        )}
        <li className="shopbar__item">
          <ShopbarItemDyn
            to="/cart"
            img="./icons/cart.svg"
            productsLength={cart.length}
          />
        </li>
        <li className="shopbar__item">
          <ShopbarItemDyn
            img="./icons/favorite.svg"
            to="/favorites"
            productsLength={favorites.length}
          />
        </li>
      </ul>
    </nav>
  );
};

export default Shopbar;
