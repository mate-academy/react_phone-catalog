import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomePage } from './pages/HomePage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { Product } from './utils/Product';
import { useState } from 'react';
import { ProductsCatalogPage } from './pages/ProductsCatalogPage';

export const App = () => {
  const [allItems, setAllItems] = useState<Product[]>([]);

  return (
    <div className="App">
      <Header />
      <div className="App__content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/phones"
            element={
              <ProductsCatalogPage
                title="Mobile phones"
                allItems={allItems}
                setAllItems={setAllItems}
                path="/api/phones.json"
              />
            }
          />
          <Route
            path="/tablets"
            element={
              <ProductsCatalogPage
                title="Tablets"
                allItems={allItems}
                setAllItems={setAllItems}
                path="/api/tablets.json"
              />
            }
          />
          <Route
            path="/accessories"
            element={
              <ProductsCatalogPage
                title="Accessories"
                allItems={allItems}
                setAllItems={setAllItems}
                path="/api/accessories.json"
              />
            }
          />
          <Route path="/product/:productId" element={<ProductDetailsPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};
