import { createRoot } from 'react-dom/client';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage/HomePage';
import { PhonePage } from './components/PhonePage/PhonePage';
import { ProductDetailsPage } from './components/PDP/ProductDetailsPage';
import { FavoriteCart } from './components/Favorite/FavoriteCart';
import { ShopingCart } from './components/ShopingCart/ShopingCart';
import { DeviceProvider } from './context/DeviceProvider';
import './App.scss';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <DeviceProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/phones" element={<PhonePage filter={'phones'} />} />
          <Route path="/tablets" element={<PhonePage filter={'tablets'} />} />
          <Route
            path="/accessories"
            element={<PhonePage filter={'accessories'} />}
          />
          <Route path="/:category/:itemId" element={<ProductDetailsPage />} />

          <Route path="/favorite" element={<FavoriteCart />} />
          <Route path="/shoping" element={<ShopingCart />} />
          <Route />
        </Routes>
      </div>
    </DeviceProvider>
  </Router>,
);
