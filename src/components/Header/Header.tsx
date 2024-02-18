import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar } from '../Navbar';

import './Header.scss';
import { MyLogo } from '../UI/MyLogo';
import { StateContext } from '../../store/State';
import { MySearch } from '../UI/MySearch';
import { CategoryName } from '../../types/product';

export const Header = () => {
  const { favoriteProducts } = useContext(StateContext);
  const numberOfFavorite = favoriteProducts.length;
  const { pathname } = useLocation();

  return (
    <header className="header" id="top">
      <div className="header__left">
        <MyLogo />
        <Navbar />
      </div>

      <div className="header__right">
        {pathname === '/phones' && (
          <MySearch
            placeholder={CategoryName.phone}
          />
        )}

        <Link to="/favorite" className="header__link">
          <img src="img/icons/heart.svg" alt="favorite" />

          {!!numberOfFavorite && (
            <div className="header__counter">{numberOfFavorite}</div>
          )}

        </Link>
        <Link to="/cart" className="header__link">
          <img src="img/icons/cart.svg" alt="cart" />
        </Link>
      </div>
    </header>
  );
};
