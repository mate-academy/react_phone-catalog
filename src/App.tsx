import { Link, Navigate, NavLink, Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomePage } from './modules/HomePage';
import { Catalog } from './modules/Catalog';
import { phoneService } from './services/phoneService';
import { tabletService } from './services/tabletService';
import { accessoryService } from './services/accessoryService';
import { DetailPage } from './modules/DetailPage';
import { Favourites } from './modules/Favourites/Favourites';
import { Cart } from './modules/Cart';
import { useEffect, useState } from 'react';
import { BadgeIcon } from './modules/shared/BadgeIcon';
import { useCart } from './context/CartContext';
import { useFavourites } from './context/FavouritesContext';
import { NotFoundPage } from './modules/shared/NotFoundPage';

const menuItems = [
  { to: '/home', label: 'Home' },
  { to: '/phones', label: 'Phones' },
  { to: '/tablets', label: 'Tablets' },
  { to: '/accessories', label: 'Accessories' },
];

export const App = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const { totalItems: totalCartItems } = useCart();
  const { favourites } = useFavourites();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleBurgerMenu = () => {
    setIsOpenMenu(prev => !prev);
  };

  const handleLinkClick = () => {
    setIsOpenMenu(false);
    document.body.style.overflow = '';
  };

  useEffect(() => {
    if (isOpenMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpenMenu]);

  return (
    <div className="App">
      <div className="header">
        <Link to="/home" className="header__logo_link">
          <img
            className="header__logo_img"
            src="/img/imgs/logo.png"
            alt="Nice Gadgets Logo"
          />
        </Link>
        <nav className="header__nav">
          <div className="header__list">
            {menuItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  isActive
                    ? 'header__list-item header__list-item--active'
                    : 'header__list-item'
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
          <div className="header__links">
            <Link to="/favourites" className="header__link">
              <BadgeIcon
                className="menu__link-icon"
                icon="favourites"
                count={favourites.length}
              />
            </Link>
            <Link to="/cart" className="header__link">
              <BadgeIcon
                className="menu__link-icon"
                icon="cart"
                count={totalCartItems}
              />
            </Link>
          </div>
        </nav>
        <button
          className={`header__burger ${isOpenMenu ? 'header__burger--active' : ''}`}
          onClick={toggleBurgerMenu}
        ></button>
      </div>
      <div className={`menu ${isOpenMenu ? 'menu--open' : ''}`}>
        <nav className="menu__nav">
          <div className="menu__list">
            {menuItems.map(item => (
              <Link
                key={item.to}
                to={item.to}
                onClick={handleLinkClick}
                className="menu__list-item"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="menu__links">
            <Link
              to="/favourites"
              className="menu__link"
              onClick={handleLinkClick}
            >
              <BadgeIcon icon="favourites" count={favourites.length} />
            </Link>
            <Link to="/cart" className="menu__link" onClick={handleLinkClick}>
              <BadgeIcon icon="cart" count={totalCartItems} />
            </Link>
          </div>
        </nav>
      </div>
      <div className="wrapper">
        <main className="main">
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<HomePage />} />
            <Route
              path="/phones"
              element={<Catalog service={phoneService} title="Mobile phones" />}
            />
            <Route
              path="/phones/:id"
              element={<DetailPage service={phoneService} />}
            />
            <Route
              path="/tablets"
              element={<Catalog service={tabletService} title="Tablets" />}
            />
            <Route
              path="/tablets/:id"
              element={<DetailPage service={tabletService} />}
            />
            <Route
              path="/accessories"
              element={
                <Catalog service={accessoryService} title="Accessories" />
              }
            />
            <Route
              path="/accessories/:id"
              element={<DetailPage service={accessoryService} />}
            />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <div className="divider"></div>
        <footer className="footer">
          <Link to="/home" className="footer__logo_link">
            <img
              className="footer__logo_img"
              src="/img/imgs/logo.png"
              alt="Nice Gadgets Logo"
            />
          </Link>
          <div className="footer__links">
            <a
              className="footer__link"
              target="_blank"
              href="https://github.com/azesmmisha"
              rel="noopener noreferrer"
            >
              Github
            </a>
            <a href="#" className="footer__link">
              Contacts
            </a>
            <a href="#" className="footer__link">
              Rights
            </a>
          </div>
          <button onClick={scrollToTop} className="footer__top_link">
            <span className="footer__top_link_text">Back to top</span>
            <div className="footer__top_link_icon"></div>
          </button>
        </footer>
      </div>
    </div>
  );
};
