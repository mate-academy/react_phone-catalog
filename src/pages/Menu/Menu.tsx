import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { GlobalContext } from '../../components/Context/Context';
import './Menu.scss';

export const Menu = () => {
  const { favorites, cartProducts } = useContext(GlobalContext);

  return (
    <div className="menu">
      <div className="menu__content">
        <div className="menu__links">
          <NavLink to="/" className="menu__link nav__link">
            home
          </NavLink>
          <NavLink to="/phones" className="menu__link nav__link">
            phones
          </NavLink>
          <NavLink to="/tablets" className="menu__link nav__link">
            tablets
          </NavLink>
          <NavLink to="/accessories" className="menu__link nav__link">
            accessories
          </NavLink>
        </div>
        <div className="menu__icons">
          <NavLink to="/favorites" className="header__icon menu__icon">
            <div className="header__icon-img icon--favourites">
              {favorites.length > 0 && (
                <span className="header__count">{favorites.length}</span>
              )}
            </div>
          </NavLink>
          <NavLink to="/cart" className="header__icon menu__icon">
            <div className="header__icon-img icon--cart">
              {cartProducts.length > 0 && (
                <span className="header__count">{cartProducts.length}</span>
              )}
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
