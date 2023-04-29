import { useContext, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import './Shopbar.scss';

import { FavoritesContext } from '../../../contexts/FavoritesContext';
import { CartContext } from '../../../contexts/CartContext';

import { searchAvailableIn } from './constants';

import ShopbarSearch from './ShopbarSearch/ShopbarSearch';
import ShopbarItemDyn from './ShopbarItemDyn/ShopbarItemDyn';

const Shopbar = () => {
  const { favorites } = useContext(FavoritesContext);
  const { cart } = useContext(CartContext);
  const location = useLocation().pathname;
  const isSearchAvailable = useMemo(() => {
    return searchAvailableIn.includes(location);
  }, [searchAvailableIn, location]);

  return (
    <nav className="shopbar">
      <ul className="shopbar__list">
        {isSearchAvailable && (
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
