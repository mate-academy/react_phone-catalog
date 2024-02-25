import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { CartIcon } from '../../assets/icons/CartIcon';
import { FavoritesIcon } from '../../assets/icons/FavoritesIcon';
import { LogoIcon } from '../../assets/icons/LogoIcon';
import { NavBar, getLinkClass } from '../NavBar/NavBar';
import { useAppSelector } from '../../helpers/hooks/hooks';
import { Search } from '../Search/Search';
import './Header.scss';

export const Header = () => {
  const { favorites } = useAppSelector(state => state.favorites);
  const { cartItems } = useAppSelector(state => state.cartItems);

  const [showSearchQuery, setShowSearchQuery] = useState(false);
  const [isCartPage, setIsCartPage] = useState(false);

  const { pathname } = useLocation();
  const validPath = pathname.slice(1);

  useEffect(() => {
    const validPaths = ['phones', 'tablets', 'accessories', 'favorites'];

    if (validPath === 'cart') {
      setIsCartPage(true);
    } else {
      setIsCartPage(false);
    }

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

        {!isCartPage && <NavBar />}
      </div>

      <div className="header__right-side-options">
        {showSearchQuery && (
          <Search validPath={validPath} />
        )}

        {!isCartPage && (
          <NavLink
            to="favorites"
            className={({ isActive }) => getLinkClass({ isActive })}
          >
            <FavoritesIcon />
            {favorites.length > 0 && (
              <span>{favorites.length}</span>
            )}
          </NavLink>
        )}

        <NavLink
          to="cart"
          className={({ isActive }) => getLinkClass({ isActive })}
        >
          <CartIcon />
          {cartItems.length > 0 && (
            <span>{cartItems.length}</span>
          )}
        </NavLink>
      </div>
    </header>
  );
};
