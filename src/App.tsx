import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { Footer } from './components/Footer';
import { CartPage } from './pages/CartPage/CartPage';
import { Home } from './pages/Home';
import { PhonesPage } from './pages/PhonesPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { Header } from './components/Header';
import { FavouritesPage } from './pages/FavoritesPage';
import { NotFoundPage } from './pages/NotFoundPage';

const App = () => {
  return (
    <div className="App page">
      <Header />
      <div className="content-wrapper">
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
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
