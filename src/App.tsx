import { Routes, Route, Navigate } from 'react-router-dom';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePages';
import { Phones } from './pages/Phones';
import { Tablets } from './pages/Tablets';
import { Accessories } from './pages/Accessories';
import { Favourites } from './pages/Favourites';
import { Cart } from './pages/Cart';
import { NotFound } from './pages/NotFound';
import { ProductDetails } from './pages/ProductDetails';

import './App.scss';

const App = () => {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/phones">
            <Route index element={<Phones />} />
            <Route path=":productId" element={<ProductDetails />} />
          </Route>

          <Route path="/tablets">
            <Route index element={<Tablets />} />
            <Route path=":productId" element={<ProductDetails />} />
          </Route>

          <Route path="/accessories">
            <Route index element={<Accessories />} />
            <Route path=":productId" element={<ProductDetails />} />
          </Route>

          <Route path="/favourites" element={<Favourites />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="notfound" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/notfound" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
