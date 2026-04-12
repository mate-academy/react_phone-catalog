import '../../variable.scss';
import './Header.scss';
import Logo from '../../../public/img/Logo/Logo.png';
import { useState } from 'react';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { Link, useLocation } from 'react-router-dom';
import { FavoriteProduct } from '../../types/FavoriteProduct';
import { BasketProduct } from '../../types/BasketProduct';

type HeaderProps = {
  favorites: FavoriteProduct[];
  baskets: BasketProduct[];
};

const Header = ({ favorites, baskets }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isPhones = location.pathname.startsWith('/phones');
  const isTablets = location.pathname.startsWith('/tablets');
  const isAcccessories = location.pathname.startsWith('/accessories');
  const isHeart = location.pathname.startsWith('/heart');
  const isBasket = location.pathname.startsWith('/basket');
  const isHome = location.pathname === '';

  return (
    <header className="header">
      <div className="container">
        <div className="header__left">
          <Link to="/" className="logo">
            <img src={Logo} alt="Logo" />
          </Link>

          <div className="nav">
            <ul className="nav__list">
              <li className="nav__item">
                <Link
                  to="/"
                  className={`nav__link ${isHome ? 'is-active' : ''}`}
                >
                  HOME
                </Link>
              </li>
              <li className="nav__item">
                <Link
                  to="/phones"
                  className={`nav__link ${isPhones ? 'is-active' : ''}`}
                >
                  PHONES
                </Link>
              </li>
              <li className="nav__item">
                <Link
                  to="/tablets"
                  className={`nav__link ${isTablets ? 'is-active' : ''}`}
                >
                  TABLETS
                </Link>
              </li>
              <li className="nav__item">
                <Link
                  to="/accessories"
                  className={`nav__link ${isAcccessories ? 'is-active' : ''}`}
                >
                  ACCESSORIES
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="header__right">
          <div className="top-bar__icons">
            <Link
              to="/heart"
              className={`icon icon--heart ${isHeart ? 'is-active' : ''}`}
            >
              {favorites.length > 0 && (
                <span className="icon--badge">{favorites.length}</span>
              )}
            </Link>
            <Link
              to="/basket"
              className={`icon icon--basket ${isBasket ? 'is-active' : ''}`}
            >
              {baskets.length > 0 && (
                <span className="icon--badge">{baskets.length}</span>
              )}
            </Link>
            <button
              className="icon icon--menu"
              onClick={() => setIsMenuOpen(true)}
            ></button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <BurgerMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          favorites={favorites}
          baskets={baskets}
        />
      )}
    </header>
  );
};

export default Header;
