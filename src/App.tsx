import { Routes, Route } from 'react-router-dom';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePages';
import { Phones } from './pages/Phones';
import { Tablets } from './pages/Tablets';
import { Accesorize } from './pages/Accesorize';
import { Favorites } from './pages/Favorites';
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

          <Route path="/acccessorize" element={<Accesorize />} />

          <Route path="/acccessorize/:productId" element={<ProductDetails />} />

          <Route path="/favorites" element={<Favorites />} />

          <Route path="/cart" element={<Cart />} />

        </Routes>

      </main>
      <Footer />

    </div>

  );
};

export default App;
