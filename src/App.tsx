import './App.scss';
import {
  NavLink, Routes, Route,
} from 'react-router-dom';
import { Homepage } from './pages/HomePage/HomePage';
import { PhonesPage } from './pages/PhonesPage/PhonesPage';
import { CartPage } from './pages/CartPage/CartPage';
import { scrollToTop } from './utils/scrollToTop';
import ProductDetailsPage from './pages/ProductDetailsPage/ProductDetailsPage';
import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage';
import { TabletsPage } from './pages/TabletsPage/TabetsPage';
import { AccessoriesPage } from './pages/AccessoriesPage/AccessoriesPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { Header } from './components/Header/Header';

const App = () => {
  return (
    <div className="App">
      <Header />

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
