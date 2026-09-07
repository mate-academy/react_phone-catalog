import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Cart } from './components/Cart';
import { Favourites } from './components/Favourites';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { ProductPage } from './components/ProductPage';
import { ProductDetailsPage } from './components/ProductDetailsPage';

export const App = () => (
  <div className="App">
    {/* <h1>Product Catalog</h1> */}
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/phones"
        element={
          <ProductPage
            category={{
              name: 'phones',
              title: 'Mobile phones',
              pathTitle: 'Phones',
            }}
          />
        }
      />
      <Route
        path="/tablets"
        element={
          <ProductPage
            category={{
              name: 'tablets',
              title: 'Tablets',
              pathTitle: 'Tablets',
            }}
          />
        }
      />
      <Route
        path="/accessories"
        element={
          <ProductPage
            category={{
              name: 'accessories',
              title: 'Accessories',
              pathTitle: 'Accessories',
            }}
          />
        }
      />
      <Route path="/favourites" element={<Favourites />} />
      <Route path="/cart" element={<Cart />} />
      <Route
        path=":category/product/:productId"
        element={<ProductDetailsPage />}
      />
    </Routes>

    <Footer />
  </div>
);
