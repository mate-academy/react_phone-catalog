import React, { useContext } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import '../../styles/style.scss';
import { icons } from '../../utils/icons';
import { NavItem } from '../Navbar/Navbar';
import { FavouritesContext } from '../Context/FavouritesContext';
import { CartsContext } from '../Context/CartsContext';

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { favourites } = useContext(FavouritesContext);
  const { carts, totalItems } = useContext(CartsContext);

  const isMenuOpen = location.pathname === '/menu';
  // const isFavouriteOpen = location.pathname === '/favourites';
  const isFavourite = favourites.length !== 0;
  const isCart = carts.length !== 0;

  return (
    <header className="header">
      <div className="left_container">
        <div className="header__icon">
          <NavLink to="/" end className="logo logo--home">
            <img className="icon icon--home" src={icons.logoMain} alt="Logo" />
          </NavLink>
        </div>

        <div className="navbar__container">
          <NavItem to="/">Home</NavItem>
          <NavItem to="/phones">Phones</NavItem>
          <NavItem to="/tablets">Tablets</NavItem>
          <NavItem to="/accessories">Accessories</NavItem>
        </div>
      </div>

      <div className="right_container">
        {isMenuOpen ? (
          <button
            className="logo logo--close"
            onClick={() => navigate(-1)}
            aria-label="Close menu"
          >
            <img
              className="icon icon--close"
              src={icons.logoClose}
              alt="Close menu"
            />
          </button>
        ) : (
          <NavLink to="/menu" end className="logo logo--menu">
            <img className="icon icon--menu" src={icons.logoMenu} alt="Logo" />
          </NavLink>
        )}
        <div className="right_container__desctop">
          <NavLink
            to="/favourites"
            end
            className={({ isActive }) =>
              `logo logo__f logo__f--header ${isActive ? 'active' : ''}`
            }
          >
            {({ isActive }) => (
              <div className="icon-wrapper">
                <img
                  className="icon icon__favourites icon__favourites--header"
                  src={
                    isActive ? icons.logoFavouritesFilled : icons.logoFavourites
                  }
                  alt="Logo"
                />
                {!isActive && isFavourite && (
                  <span className="badge badge--count">
                    {favourites.length}
                  </span>
                )}
              </div>
            )}
          </NavLink>
          <NavLink to="/carts" end className="logo logo__c logo__c--header">
            <div className="icon-wrapper">
              <img
                className="icon icon__carts icon__carts--header"
                src={icons.logoCarts}
                alt="Logo"
              />
              {isCart && (
                <span className="badge badge--count">{totalItems}</span>
              )}
            </div>
          </NavLink>
        </div>
        {/* <div className="right_container_big">
          </div> */}
      </div>
    </header>
  );
};
