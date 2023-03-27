import { Routes, Route } from 'react-router-dom';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePages';
import { Phones } from './pages/Phones';
import { Tablets } from './pages/Tablets';
import { Accessories } from './pages/Accessories';
import { Favourites } from './pages/Favourites';
import { Cart } from './pages/Cart';

import './App.scss';
import { ProductDetails } from './pages/ProductDetails';

const App = () => {
  return (

    <div className="App">

      <Header />
      <main>

        <Routes>

          <Route path="/" element={<HomePage />} />

          <Route path="/phones" element={<Phones />} />

          <Route path="/phones/:productId" element={<ProductDetails />} />

          <Route path="/tablets" element={<Tablets />} />

          <Route path="tablets/:productId" element={<ProductDetails />} />

          <Route path="/accessories" element={<Accessories />} />

          <Route path="/accessories/:productId" element={<ProductDetails />} />

          <Route path="/favourites" element={<Favourites />} />

          <Route path="/cart" element={<Cart />} />

        </Routes>

      </main>
      <Footer />

    </div>

  );
};

export default App;
