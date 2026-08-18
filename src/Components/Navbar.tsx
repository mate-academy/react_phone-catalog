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

export interface CartItem extends NewModel {
  quantity: number;
}

interface Props {
  favourites?: NewModel[];
  cart?: CartItem[];
}

export const Navbar: React.FC<Props> = ({ favourites = [], cart = [] }) => {
  const [opened, setOpened] = useState(false);

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleMenu = () => {
    setOpened(prev => !prev);
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
            <div></div>
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
            <span className="icon icon--favourite" />
            {favourites.length > 0 && (
              <span className="circle__counter">{favourites.length}</span>
            )}
          </NavLink>

          <NavLink className="link-right-shop" to="/cart">
            <span className="icon icon--cart" />
            {totalCartItems > 0 && (
              <span className="circle__counter__second">{totalCartItems}</span>
            )}
          </NavLink>
        </div>

        <button
          type="button"
          className="burger__menu"
          aria-label="Toggle menu"
          onClick={toggleMenu}
        />

        {opened && (
          <div className="burger__list">
            <div className="burger__navbar__left">
              <div className="burger__header">
                <NavLink className="navbar__logo" to="/" onClick={toggleMenu}>
                  <img alt="Nice Gadgets Logo" />
                </NavLink>
                <button
                  type="button"
                  className="cross__header__button"
                  onClick={toggleMenu}
                />
              </div>

              <div className="burger__navbar__menu">
                <NavLink className="link" to="/" onClick={toggleMenu}>
                  Home
                </NavLink>
                <NavLink className="link" to="/phones" onClick={toggleMenu}>
                  Phones
                </NavLink>
                <NavLink className="link" to="/tablets" onClick={toggleMenu}>
                  Tablets
                </NavLink>
                <NavLink
                  className="link"
                  to="/accessories"
                  onClick={toggleMenu}
                >
                  Accessories
                </NavLink>
              </div>
            </div>

            <div className="burger__navbar__actions">
              <NavLink
                className="burger__link-right-cart"
                to="/favourites"
                onClick={toggleMenu}
              >
                {favourites.length > 0 && (
                  <span className="burger__circle__counter">
                    {favourites.length}
                  </span>
                )}
              </NavLink>

              <NavLink
                className="burger__link__link-right-shop"
                to="/cart"
                onClick={toggleMenu}
              >
                {totalCartItems > 0 && (
                  <span className="burger__circle__counter__second">
                    {totalCartItems}
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
