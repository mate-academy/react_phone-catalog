import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import './styles/App.scss';
import { PhonesPage } from './pages/PhonesPage';
import { ItemCard } from './pages/ItemCard';
import { Favorites } from './pages/Favorites';
import { Cart } from './pages/Cart';

export const App = () => (
  <Routes>
    <Route path="/">
      <Route index element={<HomePage />} />
      <Route path="Phones" element={<PhonesPage />} />
      <Route path="Phones/:id" element={<ItemCard />} />
      <Route path="favorites" element={<Favorites />} />
      <Route path="cart" element={<Cart />} />
    </Route>
  </Routes>
);
