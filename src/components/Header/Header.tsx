import './Header.scss';
import { useContext, useMemo } from 'react';
import classNames from 'classnames';
import { NavBar } from '../NavBar/NavBar';
import { NavLinkMain } from '../NavLinkMain/NavLinkMain';
import { CartContext } from '../GlobalCartProvider';
import { FavouriteContext } from '../GlobalFavouritesProvider';
import { Search } from '../Search/Search';

export const Header = () => {
  const { cart } = useContext(CartContext);
  const { favourites } = useContext(FavouriteContext);

  const cartItemsCount = useMemo(() => {
    return cart.reduce((acc, curr) => {
      return acc + curr.quantity;
    }, 0);
  }, [cart]);

  const favouriteItemsCount = useMemo(() => {
    return favourites.length;
  }, [favourites]);

  return (
    <header className="Header">
      <div className="Header__navigation">
        <NavBar />
      </div>

      <div className="Header__actions">
        <Search />

        <NavLinkMain
          to="favourites"
          type="favourite"
        >
          <span
            className={classNames(
              'Header__items-count',
              { active: !!favouriteItemsCount },
            )}
          >
            {favouriteItemsCount}
          </span>
        </NavLinkMain>

        <NavLinkMain
          to="cart"
          type="cart"
        >
          <span
            className={classNames(
              'Header__items-count',
              { active: !!cartItemsCount },
            )}
          >
            {cartItemsCount}
          </span>
        </NavLinkMain>
      </div>
    </header>
  );
};
