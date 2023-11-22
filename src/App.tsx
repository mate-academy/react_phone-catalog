import './App.scss';
import {
  NavLink, Routes, Route, useLocation,
} from 'react-router-dom';
import { Homepage } from './pages/HomePage/HomePage';
import { PhonesPage } from './pages/PhonesPage/PhonesPage';
import { CartPage } from './pages/CartPage/CartPage';
import { scrollToTop } from './utils/scrollToTop';
import ProductDetailsPage from './pages/ProductDetailsPage/ProductDetailsPage';
import { useCartFavorites } from './providers/CartFavoritesProvider';
import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage';
import { Search } from './components/Search/Search';
import { TabletsPage } from './pages/TabletsPage/TabetsPage';
import { AccessoriesPage } from './pages/AccessoriesPage/AccessoriesPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';

const App = () => {
  const location = useLocation();
  const { state: { cart, favorites } } = useCartFavorites();

  const favoritesCount = favorites.length;
  const cartCount = cart.length;

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const isPhonePage = (location.pathname.startsWith('/phones')
    || location.pathname.startsWith('/favorites')
    || location.pathname.startsWith('/tablets')
    || location.pathname.startsWith('/accessories'))
    && !location.pathname.match(/^\/phones\/[^/]+$/);

  const isCartPage = location.pathname.startsWith('/cart');

  return (
    <div className="App">
      <header className="Header">
        <NavLink to="/" className="Header_logo" />
        {!isCartPage && (
          <div className="Header_menu-items">
            <NavLink
              to="/"
              className={`Header_link ${isActive('/') ? 'active' : ''}`}
            >
              home
            </NavLink>
            <NavLink
              to="/phones"
              className={`Header_link ${isActive('/phones') ? 'active' : ''}`}
            >
              phones
            </NavLink>

            <NavLink
              to="/tablets"
              className={`Header_link ${isActive('/tablets') ? 'active' : ''}`}
            >
              tablets
            </NavLink>

            <NavLink
              to="/accessories"
              className={`Header_link ${isActive('/accessories') ? 'active' : ''}`}
            >
              accessories
            </NavLink>
          </div>
        )}

        {isPhonePage && (
          <Search />
        )}

        <div className="Header_buttons">
          {!isCartPage && (
            <div className="button-box">
              <NavLink
                to="/favorites"
                className={`Header_icons Header_icons-fav ${isActive('/favorites') ? 'active' : ''}`}
              >
                {favoritesCount > 0 && (
                  <span className="Header_icons-fav_length">
                    {favoritesCount}
                  </span>
                )}
              </NavLink>
            </div>
          )}

          <div className="button-box">
            <NavLink
              to="/cart"
              className={
                `Header_icons Header_icons-cart ${isActive('/cart') ? 'active' : ''}`
              }
            >
              {cartCount > 0 && (
                <span className="Header_icons-cart_length">{cartCount}</span>
              )}
            </NavLink>
          </div>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/phones" element={<PhonesPage />} />
          <Route path="/phones/:productId" element={<ProductDetailsPage />} />
          <Route path="/tablets" element={<TabletsPage />} />
          <Route path="/accessories" element={<AccessoriesPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <footer className="Footer">
        <NavLink to="/" className="Footer_logo" />

        <div className="Footer_content">
          <NavLink
            to="https://github.com/AngerDESTROYS/react_phone-catalog"
            className="Footer_link"
          >
            github
          </NavLink>
          <NavLink
            to="https://github.com/AngerDESTROYS/react_phone-catalog"
            className="Footer_link"
          >
            contacts
          </NavLink>
          <NavLink
            to="https://github.com/AngerDESTROYS/react_phone-catalog"
            className="Footer_link"
          >
            rights
          </NavLink>
        </div>

        <div className="back-to-top">
          <p className="back-to-top_p">Back to top</p>
          <button
            aria-label="Scroll to top"
            className="back-to-top_button"
            type="button"
            onClick={scrollToTop}
          />
        </div>
      </footer>
    </div>
  );
};

export default App;
