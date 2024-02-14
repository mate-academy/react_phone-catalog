import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { CartIcon } from '../../assets/icons/CartIcon';
import { FavoritesIcon } from '../../assets/icons/FavoritesIcon';
import { LogoIcon } from '../../assets/icons/LogoIcon';
import { NavBar } from '../NavBar/NavBar';
import { useAppSelector } from '../../helpers/hooks/hooks';
import './Header.scss';
import { Search } from '../Search/Search';

export const Header = () => {
  const { favorites } = useAppSelector(state => state.favorites);
  const { cartItems } = useAppSelector(state => state.cartItems);

  const [showSearchQuery, setShowSearchQuery] = useState(false);

  const { pathname } = useLocation();
  const validPath = pathname.slice(1);

  useEffect(() => {
    const validPaths = ['phones', 'tablets', 'accessories', 'favorites'];

    if (validPaths.includes(validPath)) {
      setShowSearchQuery(true);

      return;
    }

    setShowSearchQuery(false);
  }, [validPath]);

  return (
    <header className="header">
      <div className="header__navigation">
        <NavLink to="/">
          <LogoIcon />
        </NavLink>

        <NavBar />
      </div>

      <div className="header__right-side-options">
        {showSearchQuery && (
          <Search validPath={validPath} />
          // <div className="header__query-input__box">
          //   <input
          //     type="text"
          //     className="header__query-input"
          //     placeholder={`Search in ${validPath} ...`}
          //     onChange={handleSearchQueryChange}
          //   />
          // </div>
        )}
        <NavLink to="/">
          <FavoritesIcon />
          {favorites.length > 0 && (
            <span>{favorites.length}</span>
          )}
        </NavLink>

        <NavLink to="/">
          <CartIcon />
          {cartItems.length > 0 && (
            <span>{cartItems.length}</span>
          )}
        </NavLink>
      </div>
    </header>
  );
};
