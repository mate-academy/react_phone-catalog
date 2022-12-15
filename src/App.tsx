import './App.scss';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Breadcrumbs } from './components/Breadcrumbs';
import { CartPage } from './pages/CartPage/CartPage';
import { Home } from './pages/Home';
import { PhonesPage } from './pages/PhonesPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { Header } from './components/Header';
import { FavouritesPage } from './pages/FavoritesPage';

const App = () => {
  const { pathname } = useLocation();

  const isHomePage = pathname === '/';

  return (
    <div className="App page">
      <Header />
      <div className="content-wrapper">
        {!isHomePage && (
          <div className="page__breadcrumbs">
            <Breadcrumbs />
          </div>
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/phones" element={<PhonesPage />} />
          <Route path="/phones/:productId" element={<ProductDetailsPage />} />
          <Route path="/tablets" element={<TabletsPage />} />
          <Route path="/tablets/:productId" element={<ProductDetailsPage />} />
          <Route path="/accessories" element={<AccessoriesPage />} />
          <Route
            path="/accessories/:productId"
            element={<ProductDetailsPage />}
          />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/favorites" element={<FavouritesPage />} />
          <Route path="*" element={<div>Not found</div>} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
