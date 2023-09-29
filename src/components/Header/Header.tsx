import { NavLinkMain } from '../NavLinkMain/NavLink';
import { NavBar } from '../Navbar/NavBar';
import './Header.scss';

export const Header = () => {
  return (
    <header className="Header">
      <div className="Header__navigation">
        <NavBar />
      </div>

      <div className="Header__actions">
        <NavLinkMain
          type="favourite"
          to="favourite"
        >
          <img
            src="icons/favourites.svg"
            alt="favourites"
          />
        </NavLinkMain>

        <NavLinkMain
          type="cart"
          to="card"
        >
          <img
            src="icons/cart.svg"
            alt="favourites"
          />
        </NavLinkMain>
      </div>
    </header>
  );
};
