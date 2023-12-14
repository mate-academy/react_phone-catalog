import { NavBar } from '../NavBar/NavBar';
import './header.scss';
import { useContext } from 'react';
import { Logo } from '../Logo/Logo';
import { Search } from '../Search/Search';
import { NavLink, useLocation } from 'react-router-dom';
import { ProductContext } from '../../contexts/ProductContext';

export const Header = () => {
  const location = useLocation();
  const isFilterEnabled = location.pathname === '/phones';

  const { favouriteProducts, cartProducts } = useContext(ProductContext);

  return (
    <header className="header">
      <div className="header-container">
        <Logo />
        <NavBar />
      </div>
      <div className="icon-container">
        {isFilterEnabled && <Search />}
        <div className="icon-favourites-container">
          <NavLink to="/favourites" className="icon icon-favourites" />
          {favouriteProducts.length > 0 && <div className="icon icon-favourites-count">
            {favouriteProducts.length}
          </div>}
        </div>
        <div className='icon-favourites-container'>
          <NavLink to="/bag" className="icon icon-bag" />
          {cartProducts.length > 0 && <div className="icon icon-bag-count">
            {cartProducts.length}
          </div>}
        </div>
      </div>
    </header>
  );
};
