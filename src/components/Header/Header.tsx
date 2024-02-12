import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../Navbar';

import './Header.scss';
import { MyLogo } from '../UI/MyLogo';
import { StateContext } from '../../store/State';

export const Header = () => {
  const { favoriteProducts } = useContext(StateContext);
  const numberOfFavorite = favoriteProducts.length;

  return (
    <header className="header" id="top">
      <div className="header__left">
        <MyLogo />
        <Navbar />
      </div>

      <div className="header__right">
        <Link to="/favorite" className="header__link">
          <img src="/img/icons/heart.svg" alt="favorite" />

          {!!numberOfFavorite && (
            <div className="header__counter">{numberOfFavorite}</div>
          )}

        </Link>
        <Link to="/cart" className="header__link">
          <img src="/img/icons/cart.svg" alt="cart" />
        </Link>
      </div>
    </header>
  );
};
