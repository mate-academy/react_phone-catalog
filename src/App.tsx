import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Layout } from './components/Layout/Layout';
import { AccessoriesPage } from './pages/AccesoriesPage';
import { CartPage } from './pages/CartPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';

const App = () => (
  <div className="App">
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="phones" element={<PhonesPage />} />
        <Route path="tablets" element={<TabletsPage />} />
        <Route path="accessories" element={<AccessoriesPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="cart" element={<CartPage />} />
      </Route>
    </Routes>
  </div>
);

export default App;
