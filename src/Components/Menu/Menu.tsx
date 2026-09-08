import { NavLink } from 'react-router-dom';
import './Menu.scss';

export const Menu = () => {
  return (
    <div className="menu__nav">
      <div className="menu__nav--links">
        <div className="menu__nav--link-wrapper">
          <NavLink className="menu__nav--link" to="/">
            home
          </NavLink>
        </div>

        <div className="menu__nav--link-wrapper">
          <NavLink className="menu__nav--link" to="/phones">
            phones
          </NavLink>
        </div>

        <div className="menu__nav--link-wrapper">
          <NavLink className="menu__nav--link" to="/tablets">
            tablets
          </NavLink>
        </div>

        <div className="menu__nav--link-wrapper">
          <NavLink className="menu__nav--link" to="/accessories">
            accessories
          </NavLink>
        </div>
      </div>

      <div className="menu__nav--icons">
        <NavLink to="/favorites">
          <div className="menu__nav--icons--section">
            <img src="img/ui-kit/favorites-icon.png" alt="favorites-icon" />
          </div>
        </NavLink>

        <NavLink to="/cart">
          <div
            className="menu__nav--icons--section
            menu__nav--icons--section--cart"
          >
            <img src="img/ui-kit/Shopping-bag.png" alt="Shopping-bag.png" />
          </div>
        </NavLink>
      </div>
    </div>
  );
};
