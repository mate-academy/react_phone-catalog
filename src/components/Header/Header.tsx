import './Header.scss';
import { useMemo } from 'react';
import { NavBar } from '../NavBar/NavBar';
import { NavLinkMain } from '../NavLinkMain/NavLinkMain';
import { Search } from '../Search/Search';
import { useAppSelector } from '../../app/hooks';
import { Counter } from '../Counter/Counter';

export const Header = () => {
  const cart = useAppSelector(state => state.cart);
  const favourites = useAppSelector(state => state.favourites);

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
          aria-label="favourites"
        >
          <Counter count={favouriteItemsCount} />
        </NavLinkMain>

        <NavLinkMain
          to="cart"
          type="cart"
          aria-label="cart"
        >
          <Counter count={cartItemsCount} />
        </NavLinkMain>
      </div>
    </header>
  );
};
