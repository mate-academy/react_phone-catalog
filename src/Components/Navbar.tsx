import { NavLink } from 'react-router-dom';
import '../styles/Navbar.scss';
import { useState } from 'react';

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
  const [opened, setOpened] = useState(false);

  const functionforopening = () => {
    if (opened === false) {
      setOpened(true);
    } else {
      setOpened(false);
    }
  };

  return (
    <nav
      data-cy="nav"
      className="navbar"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar__container">
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

        <button
          type="button"
          className="burger__menu"
          aria-label="Toggle menu"
          onClick={() => functionforopening()}
        ></button>
        {opened && (
          <div className="burger__list">
            <div className="burger__navbar__left">
              <div className="burger__header">
                <NavLink className="navbar__logo" to="/">
                  <img src="/img/Logo.svg" alt="Nice Gadgets Logo" />
                </NavLink>
                <button
                  className="cross__header__button"
                  onClick={() => functionforopening()}
                ></button>
              </div>

              <div className="burger__navbar__menu">
                <NavLink
                  className="link"
                  to="/"
                  onClick={() => functionforopening()}
                >
                  Home
                </NavLink>
                <NavLink
                  className="link"
                  to="/phones"
                  onClick={() => functionforopening()}
                >
                  Phones
                </NavLink>
                <NavLink
                  className="link"
                  to="/tablets"
                  onClick={() => functionforopening()}
                >
                  Tablets
                </NavLink>
                <NavLink
                  className="link"
                  to="/accessories"
                  onClick={() => functionforopening()}
                >
                  Accessories
                </NavLink>
              </div>
            </div>

            <div className="burger__navbar__actions">
              <NavLink
                className="burger__link-right-cart"
                to="/favourites"
                onClick={() => functionforopening()}
              >
                {FavouritesA && FavouritesA.length > 0 && (
                  <span className="burger__circle__counter">
                    {FavouritesA.length}
                  </span>
                )}
              </NavLink>
              <NavLink
                className="burger__link__link-right-shop"
                to="/cart"
                onClick={() => functionforopening()}
              >
                {Cart && Cart.length > 0 && (
                  <span className="burger__circle__counter__second">
                    {Cart.length}
                  </span>
                )}
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
