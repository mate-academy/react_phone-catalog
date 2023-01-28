import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Layout } from './components/Layout/Layout';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { CartPage } from './pages/CartPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PhonesPage } from './pages/PhonesPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { TabletsPage } from './pages/TabletsPage';

const App = () => (
  <div className="App">
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" />} />
        <Route path="phones">
          <Route index element={<PhonesPage />} />
          <Route path=":productId" element={<ProductDetailsPage />} />
        </Route>
        <Route path="tablets">
          <Route index element={<TabletsPage />} />
          <Route path=":productId" element={<ProductDetailsPage />} />
        </Route>
        <Route path="accessories">
          <Route index element={<AccessoriesPage />} />
          <Route path=":productId" element={<ProductDetailsPage />} />
        </Route>
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </div>
);

export default App;
