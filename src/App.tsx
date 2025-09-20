/* eslint-disable max-len */
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';
import './App.scss';
import { HomePage } from './modules/Home/HomePage';
import { useEffect, useState } from 'react';
import { PhonePage } from './modules/ProductPages/PhonePage';
import { TabletsPage } from './modules/ProductPages/TabletsPage';
import { Accessories } from './modules/ProductPages/Accessuries';
import { ProductDetailsPage } from './modules/ProductDetailsPage/ProductDetailsPage';
import { CartPage } from './modules/CartPage/CartPage';
import { FavoritesPages } from './modules/FavoritesPage/FavoritesPage';
import { NavBar } from './modules/NavBar/NavBar';
import { Footer } from './modules/Footer/Footer';
import { useCart } from './modules/CartContext/CartContext';

export const App = () => {
  const [clickOnLogoBar, setClickOnLogoBar] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 639);
  const { cartItems, favoriteItems } = useCart();

  const links = ['home', 'phones', 'tablets', 'accessories'];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 639);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (clickOnLogoBar) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [clickOnLogoBar]);

  useEffect(() => {
    localStorage.setItem('clickOnLogoBar', JSON.stringify(clickOnLogoBar));
  }, [clickOnLogoBar]);

  return (
    <HashRouter>
      <div className="App">
        <div className="section">
          <div className="container">
            <h1 className="product__catalog" hidden>
              Product Catalog
            </h1>
            <NavBar
              isMobile={isMobile}
              links={links}
              setClickOnLogoBar={setClickOnLogoBar}
              clickOnLogoBar={clickOnLogoBar}
              cartItems={cartItems}
              favoriteItems={favoriteItems}
            />

            {clickOnLogoBar && (
              <aside className={clickOnLogoBar ? 'menu menu--open' : 'menu'}>
                <ul className="menu__brand">
                  {links.map((item, index) => (
                    <li className="menu__item" key={index}>
                      <NavLink
                        className={({ isActive }) =>
                          `menu__link ${isActive ? 'has-background-grey-lighter' : ''}`
                        }
                        to={item === 'home' ? '/' : `/${item}`}
                        onClick={() => setClickOnLogoBar(false)}
                      >
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                      </NavLink>
                    </li>
                  ))}
                </ul>
                <div className="menu__right">
                  {[
                    { to: '/favorites', className: 'menu__icon__like' },
                    { to: '/cart', className: 'menu__icon__cart' },
                  ].map(({ to, className }) => (
                    <button className="menu__button" key={to}>
                      <NavLink
                        aria-current="page"
                        className={className}
                        to={to}
                        onClick={() => {
                          setClickOnLogoBar(false);
                        }}
                      />
                    </button>
                  ))}
                </div>
              </aside>
            )}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/phones" element={<PhonePage />} />
              <Route path="/tablets" element={<TabletsPage />} />
              <Route path="/accessories" element={<Accessories />} />
              <Route
                path="/:category/:productId"
                element={<ProductDetailsPage />}
              />
              <Route path="/cart" element={<CartPage />}></Route>
              <Route path="/favorites" element={<FavoritesPages />}></Route>
              <Route path="/Menu" element={<aside></aside>} />
              <Route
                path="*"
                element={<h1 className="title">Page not found</h1>}
              />
            </Routes>

            <Footer />
          </div>
        </div>
      </div>
    </HashRouter>
  );
};
