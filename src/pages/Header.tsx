import { NavLink, Route, Routes } from 'react-router-dom';
import { useContext, useState } from 'react';
import NavBar from '../components/NavBar';
import { ReactComponent as Logo } from '../assets/images/icons/LOGO.svg';
import { ReactComponent as ShoppingIcon }
  from '../assets/images/icons/shopping-cart-icon.svg';
import { ReactComponent as LikeIcon }
  from '../assets/images/icons/likes-Icon.svg';
import { ReactComponent as Hamburger }
  from '../assets/images/icons/hamburger-icon.svg';

import { CartContext } from '../context/CartProvider';
import SearchInput from '../components/SearchInput';
import { FavoritesContext } from '../context/FavoritesProvider';
import SideMenu from '../components/SideMenu';

const Header = () => {
  const { cart } = useContext(CartContext);
  const { favorites } = useContext(FavoritesContext);
  const [show, setShow] = useState(false);

  const showSlider = () => {
    setShow(!show);
  };

  return (
    <header className="header page__header">
      <SideMenu showSlider={showSlider} show={show} />
      <button
        type="button"
        className="header__sidemMenu-btn"
        onClick={showSlider}
      >
        <Hamburger />
      </button>
      <NavLink
        to="/"
        className="header__logo"
      >
        <Logo className="header__img" />
      </NavLink>
      <NavBar />
      <Routes>
        <Route path="phones" element={<SearchInput />} />
        <Route path="tablets" element={<SearchInput />} />
      </Routes>
      <div className="header__icon-container">
        <NavLink
          to="/favorites"
          className={({ isActive }) => `header__icon  ${(isActive ? 'nav__link--active' : '')}`}
        >
          <LikeIcon />
          <div
            className="header__cart-quantaty"
          >
            {favorites.length > 0 && favorites.length}
          </div>
        </NavLink>
        <NavLink
          to="/cartPage"
          className={({ isActive }) => `header__icon  ${(isActive ? 'nav__link--active' : '')}`}
        >
          <ShoppingIcon />
          <div
            className="header__cart-quantaty"
          >
            {cart.length > 0 && cart.length}
          </div>
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
