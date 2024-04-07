import { NavLink } from 'react-router-dom';
import './Menu.scss';

export const Menu = () => {
  return (
    <aside className="menu">
      <nav className="menu__links">
        <NavLink to="/" className="menu__link">
          Home
        </NavLink>
        <NavLink to="/phones" className="menu__link">
          Phones
        </NavLink>
        <NavLink to="/tablets" className="menu__link">
          Tablets
        </NavLink>
        <NavLink to="/accessories" className="menu__link">
          Accessories
        </NavLink>
      </nav>
      <nav className="menu__icons">
        <div className="icon-container">
          <NavLink
            to="/favorites"
            className="menu__icon menu__icon--favourites"
          ></NavLink>
        </div>
        <div className="icon-container">
          <NavLink to="/cart" className="menu__icon menu__icon--cart"></NavLink>
        </div>
      </nav>
    </aside>
  );
};
