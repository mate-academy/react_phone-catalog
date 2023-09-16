import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import './style.scss';
import { Logo } from '../Logo/Logo';
import { Navigation } from '../Navigaton/Navigation';
import { CartContext } from '../../store/CartContext';
import { FavoritesContext } from '../../store/FavoritesContext';
import { Search } from '../Search/Search';
import { Button } from '../Button/Button';
import { searchAvailable } from '../../utils/searchAvailable';

export const Header = () => {
  const location = useLocation();
  const { cartProducts } = useContext(CartContext);
  const { favoritesProducts } = useContext(FavoritesContext);
  const isSearch = searchAvailable.includes(location.pathname);
  const isInCart = location.pathname === '/cart';

  if (isInCart) {
    return (
      <header className="header">
        <Logo parent="header" />
        <Button
          purpose="cart"
          count={cartProducts.length}
        />
      </header>
    );
  }

  return (
    <header className="header">
      <Logo parent="header" />

      <div className="header__bar">
        <Navigation />

        <div className="header__items">
          {isSearch && (
            <Search />
          )}

          <div className="header__buttons">
            <Button
              purpose="favorites"
              count={favoritesProducts.length}
            />
            <Button
              purpose="cart"
              count={cartProducts.length}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
