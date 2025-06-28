import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Cart } from './components/Cart';
import { Favourites } from './components/Favourites';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { ProductPage } from './components/ProductPage';

export const App = () => (
  <div className="App">
    {/* <h1>Product Catalog</h1> */}
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="phones"
        element={
          <ProductPage
            category={{ name: 'Mobile phones', pathTitle: 'Phones' }}
          />
        }
      />
      <Route
        path="tablets"
        element={
          <ProductPage category={{ name: 'Tablets', pathTitle: 'Tablets' }} />
        }
      />
      <Route
        path="accessories"
        element={
          <ProductPage
            category={{ name: 'Accessories', pathTitle: 'Accessories' }}
          />
        }
      />
      <Route path="favourites" element={<Favourites />} />
      <Route path="cart" element={<Cart />} />
    </Routes>
    <Footer />
  </div>
);
