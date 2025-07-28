import { Dispatch, SetStateAction } from 'react';
import './Header.scss';
import { Link, useLocation } from 'react-router-dom';

type Props = {
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
};

export const Header: React.FC<Props> = ({ setMenuOpen }) => {
  const { pathname } = useLocation();

  const handleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <div className="header">
      <div className="header__wrapper">
        <div className="header__logo">
          <img
            src="./public/img/logo.png"
            alt="logo"
            className="header__logo--img"
          />
        </div>
        <div className="header__nav">
          <Link
            to="/"
            className={`header__nav--item ${pathname === '/' ? 'is-active' : ''}`}
          >
            home
          </Link>
          <Link
            to="/phones"
            className={`header__nav--item ${pathname === '/phones' ? 'is-active' : ''}`}
          >
            phones
          </Link>
          <Link
            to="/tablets"
            className={`header__nav--item ${pathname === '/tablets' ? 'is-active' : ''}`}
          >
            tablets
          </Link>
          <Link
            to="/accessories"
            className={`header__nav--item ${pathname === '/accessories' ? 'is-active' : ''}`}
          >
            accessories
          </Link>
        </div>
      </div>
      <div className="header__trinkets">
        <Link
          to="/favourites"
          className={`header__trinkets--heart ${pathname === '/favourites' ? 'heart-active' : ''}`}
        ></Link>
        <Link to="/basket" className="header__trinkets--basket">
          <img src="./public/img/basket.png" alt="shopping cart" />
        </Link>
      </div>
      <div className="header__burger">
        <img
          src="./public/img/burger.png"
          alt="burger"
          className="header__burger--img"
          onClick={handleMenu}
        />
      </div>
    </div>
  );
};
