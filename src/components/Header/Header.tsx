import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { NavLinkMain } from '../NavLinkMain/NavLink';
import { NavBar } from '../Navbar/NavBar';
import './Header.scss';
import { CartContext } from '../../context/CartContext';

export const Header = () => {
  const { totalQuantity } = useContext(CartContext);
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
            to="favourite"
          >
            <img
              src="icons/favourites.svg"
              alt="favourites"
            />
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
