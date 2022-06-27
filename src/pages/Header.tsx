import { NavLink, Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import NavBar from '../components/NavBar';
import { ReactComponent as Logo } from '../assets/images/icons/LOGO.svg';
import { ReactComponent as ShoppingIcon }
  from '../assets/images/icons/shopping-cart-icon.svg';
import { ReactComponent as LikeIcon }
  from '../assets/images/icons/likes-Icon.svg';
import { CartContext } from '../context/CartProvider';
import SearchInput from '../components/SearchInput';
import { FavoritesContext } from '../context/FavoritesProvider';

const Header = () => {
  const { cart } = useContext(CartContext);
  const { favorites } = useContext(FavoritesContext);

  return (
    <header className="header page__header">
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

    </header>
  );
};

export default Header;
