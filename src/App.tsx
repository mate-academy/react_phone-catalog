import {
  Navigate, Route, Routes, useLocation,
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
import { getProductDetails, getProducts } from './api/products';
import { TabletsDetails } from './pages/TabletsPage/TabletsDetails';
import { ProductContext } from './contexts/ProductContext';
import { AccessoryDetails } from './pages/AccessoriesPage/AccessoryDetails';
import { Loader } from './components/Loader';
import { FavouritesPage } from './pages/FavouritesPage/FavouritesPage';
import { CartPage } from './pages/CartPage/CartPage';
import { ProdcutDetails } from './types/ProductDetails';

const App = () => {
  const scrollToRef = useRef(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentProducts, setCurrentProducts] = useState<Product[]>([]);
  const location = useLocation();
  const arrOfLocation = location.pathname.split('/').filter(x => !!x);
  const selectedProductId = arrOfLocation.at(-1);
  const [
    visibleProducts,
    setVisibleProducts,
  ] = useState<Product[]>([]);
  const [
    selectedProductDetails,
    setSelectedProductDetails,
  ] = useState<ProdcutDetails | null>(null);
  const [isLoader, setIsLoader] = useState(false);
  const [isDetailsLoader, setIsDetailsLoader] = useState(false);

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

  const fetchDetails = async (productId: string) => {
    try {
      setIsDetailsLoader(true);
      const data = await getProductDetails(productId);

      setIsDetailsLoader(false);
      setSelectedProductDetails(data);

      return data;
    } catch {
      setIsDetailsLoader(false);
    }

    return 0;
  };

  useEffect(() => {
    if (arrOfLocation.length > 1 && selectedProductId) {
      fetchDetails(selectedProductId);
    }
  }, [selectedProductId]);

  return (
    <ProductContext.Provider value={{
      currentProducts,
      setCurrentProducts,
      products,
      visibleProducts,
      setVisibleProducts,
      selectedProductDetails,
      setSelectedProductDetails,
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
                      pageType="phones"
                    />
                  )
              }
            />

            <Route
              path=":productId"
              element={isDetailsLoader
                ? <Loader />
                : (
                  selectedProductDetails && <PhoneDetails />
                )}
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
                    pageType="tablets"
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
                    pageType="accessories"
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
