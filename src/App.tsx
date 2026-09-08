import './styles/App.scss';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Phones from './components/Phones';
import ProductPage from './components/ProductPage';
import Favourites from './components/Favourites';
import Card from './components/Card';
import AppLayout from './components/AppLayout';
import Tablets from './components/Tablets';
import Accessories from './components/Accessories';
import NotFoundPage from './components/NotFoundPage';

export const App = () => (
  <div className="app page">
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="phones">
          <Route index element={<Phones />} />
          <Route path=":productId" element={<ProductPage />} />
        </Route>
        <Route path="tablets">
          <Route index element={<Tablets />} />
          <Route path=":productId" element={<ProductPage />} />
        </Route>
        <Route path="accessories">
          <Route index element={<Accessories />} />
          <Route path=":productId" element={<ProductPage />} />
        </Route>
        <Route path="favorites" element={<Favourites />} />
        <Route path="card" element={<Card />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </div>
);
