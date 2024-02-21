import { NavLink, useLocation } from 'react-router-dom';
import { LogoIcon } from '../../assets/icons/LogoIcon';
import { FavIcon } from '../../assets/icons/FavIcon';
import { CartIcon } from '../../assets/icons/CartIcon';
import { NavBar } from '../NavBar/NavBar';
import { useAppSelector } from '../../helpers/hooks/hooks';
import { Search } from '../Search/Search';
import './Header.scss';

export const Header: React.FC = () => {
  const { pathname } = useLocation();
  const { favorites } = useAppSelector(state => state.favorites);
  const { cartItems } = useAppSelector(state => state.cartItems);

  const showFavorites = !pathname.endsWith('cart');
  const showSearch = pathname.endsWith('phones')
    || pathname.endsWith('tablets')
    || pathname.endsWith('accessories')
    || pathname.endsWith('favorites');

  return (
    <header className="header">
      <div className="header__navigation">
        <NavLink to="/">
          <LogoIcon />
        </NavLink>

        <NavBar />
      </div>
      <div className="header__right-side-options">
        {showSearch && (
          <Search />
        )}
        {showFavorites && (
          <NavLink to="/favorites">
            <FavIcon />
            {favorites.length > 0 && <span>{favorites.length}</span>}
          </NavLink>
        )}

        <NavLink to="/cart">
          <CartIcon />
          {cartItems.length > 0 && <span>{cartItems.length}</span>}
        </NavLink>
      </div>
    </header>
  );
};
