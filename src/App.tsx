import {
  Navigate, Route, Routes,
} from 'react-router-dom';
import 'src/styles/main.scss';
import { Footer } from 'src/globalSections/Footer';
import { useEffect, useRef, useState } from 'react';
import { HomePage } from './pages/HomePage/HomePage';
import { PhonesPage } from './pages/PhonesPage/PhonesPage';
import { Header } from './globalSections/Header';
import { TabletsPage } from './pages/TabletsPage/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage/AccessoriesPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PhoneDetails } from './pages/PhonesPage/PhoneDetails';
import { Product } from './types/Product';
import { getProducts } from './api/products';
import { TabletsDetails } from './pages/TabletsPage/TabletsDetails';
import { ProductContext } from './contexts/ProductContext';
import { AccessoryDetails } from './pages/AccessoriesPage/AccessoryDetails';
import { Loader } from './components/Loader';
import { FavouritesPage } from './pages/FavouritesPage/FavouritesPage';
import { CartPage } from './pages/CartPage/CartPage';

const App = () => {
  const scrollToRef = useRef(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentProducts, setCurrentProducts] = useState<Product[]>([]);
  const [
    visibleProducts,
    setVisibleProducts,
  ] = useState<Product[]>([]);
  const [isLoader, setIsLoader] = useState(false);

  const fetchProducts = async () => {
    setIsLoader(true);

    try {
      const data = await getProducts();

      setProducts(data);
      setIsLoader(false);

      return data;
    } catch {
      setIsLoader(false);
    }

    return 0;
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{
      currentProducts,
      setCurrentProducts,
      products,
      visibleProducts,
      setVisibleProducts,
    }}
    >
      <div className="App">
        <Header
          scrollToRef={scrollToRef}
        />

        <Routes>
          <Route path="/">
            <Route
              index
              element={
                isLoader
                  ? <Loader />
                  : <HomePage />
              }
            />
            <Route path="home" element={<Navigate to="/" />} />
          </Route>

          <Route path="/phones">
            <Route
              index
              element={
                isLoader
                  ? <Loader />
                  : (
                    <PhonesPage
                      title="Mobile Phones"
                      pageType="phone"
                    />
                  )
              }
            />

            <Route
              path=":productId"
              element={<PhoneDetails />}
            />
          </Route>

          <Route path="/tablets">
            <Route
              index
              element={isLoader
                ? <Loader />
                : (
                  <TabletsPage
                    title="Tablets"
                    pageType="tablet"
                  />
                )}
            />
            <Route
              path=":productId"
              element={(
                <TabletsDetails />
              )}
            />
          </Route>

          <Route path="/accessories">
            <Route
              index
              element={isLoader
                ? <Loader />
                : (
                  <AccessoriesPage
                    title="Accessories"
                    pageType="accessory"
                  />
                )}
            />
            <Route path=":productId" element={<AccessoryDetails />} />
          </Route>

          <Route path="/favourites" element={<FavouritesPage />} />

          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        <Footer scrollToRef={scrollToRef} />
      </div>
    </ProductContext.Provider>
  );
};

export default App;
