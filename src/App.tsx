import './App.scss';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import * as productsApi from './api/api';

import { HomePage } from './pages/HomePage';
import { PhonePage } from './pages/PhonePage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { CartPage } from './pages/CartPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { LocalStorageProvider } from './LocalStorageContext';
import { Loader } from './components/Loader';

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const searchData = useLocation().search.split('?query=')[1];
  let visibleProducts = [...products];

  if (searchData) {
    const searchInfo = searchData.toLowerCase();
    const searchProducts = products.filter((product) => {
      return product.id.replaceAll('-', '').includes(searchInfo);
    });

    visibleProducts = searchProducts;
  }

  useEffect(() => {
    productsApi.getProducts()
      .then((allProducts) => {
        return setProducts(allProducts);
      });
  }, []);

  let hotProducts = products.filter((product:Product) => {
    return product.discount !== 0;
  });

  hotProducts = hotProducts.sort((a:Product, b:Product) => {
    return (
      ((b.price - (b.price * (1 - b.discount / 100)))
      - (a.price - a.price * (1 - a.discount / 100)))
    );
  });

  let newProducts = products.filter((product:Product) => {
    return product.discount === 0;
  });

  newProducts = newProducts.sort((a:Product, b:Product) => {
    return (
      b.age - a.age
    );
  });

  const phones = visibleProducts.filter((product:Product) => {
    return product.type === 'phone';
  });

  const tablets = visibleProducts.filter((product:Product) => {
    return product.type === 'tablet';
  });

  const accessories = visibleProducts.filter((product:Product) => {
    return product.type === 'accessories';
  });

  return (
    <LocalStorageProvider>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={products.length > 0 ? (
              <HomePage
                hotProducts={hotProducts}
                newProducts={newProducts}
              />
            ) : (
              <Loader />
            )}
          />
          <Route
            path="/phones"
            element={<PhonePage phones={phones} />}
          />
          <Route
            path="/phones/:productId"
            element={
              <ProductDetailsPage products={phones} />
            }
          />
          <Route
            path="/tablets"
            element={<TabletsPage tablets={tablets} />}
          />
          <Route
            path="/tablets/:productId"
            element={
              <ProductDetailsPage products={tablets} />
            }
          />
          <Route
            path="/accessories"
            element={
              <AccessoriesPage accessories={accessories} />
            }
          />
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="/favourites"
            element={(
              <FavoritesPage />
            )}
          />
          <Route
            path="*"
            element={(
              <HomePage
                hotProducts={hotProducts}
                newProducts={newProducts}
              />
            )}
          />
        </Routes>
      </div>
    </LocalStorageProvider>

  );
};

export default App;
