import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { NotFoundPage } from './pages/NotFoundPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { TabletsPage } from './pages/TabletsPage';
import { PhonesPage } from './pages/PhonesPage';
import { CartPage } from './pages/CartPage';
import { HomePage } from './pages/HomePage';
import { ContextProvider } from './components/ContextProvider/ContextProvider';

const App = () => {
  return (
    <div className="App">
      <ContextProvider>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/phones" element={<PhonesPage />} />
            <Route path="/phones/:id" element={<ProductDetailsPage />} />
            <Route path="/tablets" element={<TabletsPage />} />
            <Route path="/accessories" element={<AccessoriesPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>

          <PhonesPage />
        </div>

        <Footer />
      </ContextProvider>
    </div>
  );
};

export default App;
