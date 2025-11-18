import { Link, useLocation } from 'react-router-dom';
import './Navbar.scss';
import logo from '../../images/Logo.png';
import menuBatton from '../../images/icons/menu-batton.png';
import close from '../../images/icons/Close.png';
import favourites from '../../images/icons/favourites-heart-like.png';
import shoppingBag from '../../images/icons/shopping-bag.png';
import { useContext } from 'react';
import { DevicesContext, DevicesContextType } from '../../DevicesContext';

export const Navbar = () => {
  const { pathname } = useLocation();
  const context = useContext<DevicesContextType | undefined>(DevicesContext);

  if (!context) {
    return null;
  }

  const { isMobile, navMenuList } = context;

  return (
    <div className="top-bar" id="header">
      <div className="logo">
        <img src={logo} alt="Logo" className="logo__header" />
      </div>

      {isMobile ? (
        <div className="nav">
          {pathname !== '/aside' ? (
            <Link to={'aside'} className="nav__menu">
              <img
                src={menuBatton}
                alt="menu batton"
                className="nav__menu__icon"
              />
            </Link>
          ) : (
            <Link to={'/'} className="nav__menu">
              <img src={close} alt="menu batton" className="nav__menu__icon" />
            </Link>
          )}
        </div>
      ) : (
        <div className="nav">
          <div className="nav__list">
            <ul className="nav__menu-list">
              {navMenuList.map(el => (
                <li className="nav__menu-list__block-item" key={el}>
                  <Link
                    to={el === 'home' ? '/' : `/${el}`}
                    className="nav__menu-list__item"
                  >
                    {el}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="nav__items">
            <Link to={'favourites'} className="nav__items__icon">
              <img
                src={favourites}
                alt="favourites"
                className="nav__items__image"
              />
            </Link>
            <Link to={'cart'} className="nav__items__icon">
              <img
                src={shoppingBag}
                alt="shopping bag"
                className="nav__items__image"
              />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
