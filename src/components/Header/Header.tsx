import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { NavLinkMain } from '../NavLinkMain/NavLink';
import { NavBar } from '../Navbar/NavBar';
import './Header.scss';
import { CartContext } from '../../context/CartContext';
import { FavouriteContext } from '../../context/FavouriteContext';

export const Header = () => {
  const { totalQuantity } = useContext(CartContext);
  const { favourites } = useContext(FavouriteContext);
  const isCartOpened = useLocation().pathname === '/cart';

  return (
    <header className="Header">
      <div className="Header__navigation">
        <NavBar isCartOpened={isCartOpened} />
      </div>

      <div className="Header__actions">
        {!isCartOpened && (
          <NavLinkMain
            type="favourite"
            to="favourites"
          >
            <img
              src="icons/favourites.svg"
              alt="favourites"
            />
            {favourites.length > 0 && (
              <span
                className="Counter"
              >
                {favourites.length}
              </span>
            )}
          </NavLinkMain>
        )}

        <NavLinkMain
          type="cart"
          to="cart"
        >
          <img
            src="icons/cart.svg"
            alt="favourites"
          />
          {totalQuantity > 0 && (
            <span
              className="Counter"
            >
              {totalQuantity}
            </span>
          )}
        </NavLinkMain>
      </div>
    </header>
  );
};
