import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Homepage } from './components/Homepage/Homepage';
import {
  ProductDetailsPage,
} from './components/ProductDetailsPage/ProductDetailsPage';
import { API_URL, getProducts } from './helpers/helper';
import { Product } from './types/Products';
import './App.scss';
import { Favoutires } from './components/Favourites/Favourites';
import { Cart } from './components/Cart/Cart';
import {
  ProductDataContext,
} from './components/ProductDataContext/ProductDataContext';
import { ScrollToTop } from './helpers/ScrollToTop';
import { PhonesPage } from './components/ProductPage/PhonesPage/PhonesPage';
import { TabletsPage } from './components/ProductPage/TabletsPage/TabletsPage';
import {
  AccessoriesPage,
} from './components/ProductPage/AccessoriesPage/AccessoriesPage';
import { NotFound } from './components/NotFound/NotFound';

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getProducts(API_URL);

        setProducts(response);
      } catch (fetchError) {
        throw new Error('Data could not be fetched');
      }
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      <ScrollToTop />
      <div className="wrapper">
        <Header />
        <ProductDataContext.Provider value={products}>
          <Routes>
            <Route
              path="/"
              element={<Homepage products={products} />}
            />
            <Route path="/phones">
              <Route index element={<PhonesPage />} />
              <Route
                path=":productId"
                element={<ProductDetailsPage products={products} />}
              />
            </Route>
            <Route path="/tablets">
              <Route index element={<TabletsPage />} />
              <Route
                path=":productId"
                element={<ProductDetailsPage products={products} />}
              />
            </Route>
            <Route path="/accessories">
              <Route index element={<AccessoriesPage />} />
              <Route
                path=":productId"
                element={<ProductDetailsPage products={products} />}
              />
            </Route>
            <Route
              path="favourites"
              element={<Favoutires />}
            />
            <Route
              path="cart"
              element={<Cart />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ProductDataContext.Provider>
        <Footer />
      </div>
    </div>
  );
};

export default App;
