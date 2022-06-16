import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { Phones } from './pages/Phones';
import { Tablets } from './pages/Tablets';
import { Accessories } from './pages/Accessoires';
import { ProductDetails } from './pages/ProductDetails';
import { Favourites } from './pages/Favourites';
import { Cart } from './pages/Cart';
import { Footer } from './components/Footer';
import { NotFound } from './pages/NotFound';

import './assets/styles/main.scss';

const App = () => (
  <div className="App">
    <Header />

    <main>
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="/phones"
          element={<Phones />}
        />
        <Route
          path="/phones/:productId"
          element={<ProductDetails />}
        />
        <Route
          path="/tablets"
          element={<Tablets />}
        />
        <Route
          path="/tablets/:productId"
          element={<ProductDetails />}
        />
        <Route
          path="/accessories"
          element={<Accessories />}
        />
        <Route
          path="/accessories/:productId"
          element={<ProductDetails />}
        />
        <Route
          path="/favourites"
          element={<Favourites />}
        />
        <Route
          path="/cart"
          element={<Cart />}
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </main>

    <Footer />
  </div>
);

export default App;
