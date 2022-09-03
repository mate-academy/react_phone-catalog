import './App.scss';
import { Routes, Route } from 'react-router-dom';
import CartPage from './pages/CartPage/CartPage';
// import { Header } from './components/Header/Header';
import { HomePage } from './pages/HomePage/HomePage';
import { PhonesPage } from './pages/PhonesPage/PhonesPage';
import { TabletsPage } from './pages/TabletsPage/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage/AccessoriesPage';
import {
  ProductDetailsPage,
} from './pages/ProductDetailsPage/ProductDetailsPage';
import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';

// import { Product } from './react-app-env';
// import { ShopCategory } from './components/Main/ShopCategory/ShopCategory';
// import { Footer } from './components/Footer/Footer';

export const App = () => {
  // const [currentFavor, setCurrentFavor] = useState<Product[]>([]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={(<HomePage />)} />
        <Route path="/phones" element={<PhonesPage />} />
        <Route path="/tablets" element={<TabletsPage />} />
        <Route path="/accessories" element={<AccessoriesPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};
