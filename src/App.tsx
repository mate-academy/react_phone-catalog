import './App.scss';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { Header } from './modules/Header/Header';
import { HomePage } from './modules/HomePage/HomePage';
import { AppContextProvider } from './utils/AppContext';
import { Footer } from './shared/components/Footer/Footer';
import { PhonesPage } from './modules/PhonesPage/PhonesPage';
import { TabletsPage } from './modules/TabletsPage/TabletsPage';
import { AccessoriesPage } from './modules/AccessoriesPage/AccessoriesPage';
import { ProductInfoPage } from './modules/ProductInfoPage/ProductInfoPage';
import { FavouritePage } from './modules/FavouritesPage/FavouritesPage';
import { CartPage } from './modules/CartPage/CartPage';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';
import { NoProductPage } from './modules/NoProductPage/NoProductPage';

export const App = () => (
  <Router>
    <div className="App">
      <AppContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/phones/:?params?" element={<PhonesPage />} />
          <Route path="/tablets/:?params?" element={<TabletsPage />} />
          <Route path="/accessories/:?params?" element={<AccessoriesPage />} />
          <Route path="/product/:productId" element={<ProductInfoPage />} />
          <Route path="/favorites" element={<FavouritePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product-not-found" element={<NoProductPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </AppContextProvider>
    </div>
  </Router>
);
