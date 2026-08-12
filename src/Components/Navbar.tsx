import { NavLink } from 'react-router-dom';
import '../styles/Navbar.scss';

export interface NewModel {
  id: number;
  category: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
}

interface Props {
  FavouritesA?: NewModel[];
  Cart?: NewModel[];
}

export const Navbar: React.FC<Props> = ({ FavouritesA, Cart }) => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container navbar__container">
        <div className="navbar__left">
          <NavLink className="navbar__logo" to="/">
            <img src="/img/Logo.svg" alt="Nice Gadgets Logo" />
          </NavLink>

          <div className="navbar__menu">
            <NavLink className="link" to="/">
              Home
            </NavLink>
            <NavLink className="link" to="/phones">
              Phones
            </NavLink>
            <NavLink className="link" to="/tablets">
              Tablets
            </NavLink>
            <NavLink className="link" to="/accessories">
              Accessories
            </NavLink>
          </div>
        </div>
        <div className="navbar__actions">
          <NavLink className="link-right-cart" to="/favourites">
            {FavouritesA && FavouritesA.length > 0 && (
              <span className="circle__counter">{FavouritesA.length}</span>
            )}
          </NavLink>
          <NavLink className="link-right-shop" to="/cart">
            {Cart && Cart.length > 0 && (
              <span className="circle__counter__second">{Cart.length}</span>
            )}
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
