import {
  Navigate, Route, Routes,
} from 'react-router-dom';
import { Footer } from 'src/globalSections/Footer';
import { useEffect, useRef, useState } from 'react';
import { HomePage } from './pages/HomePage/HomePage';
import { PhonesPage } from './pages/PhonesPage/PhonesPage';
import { Header } from './globalSections/Header';
import 'src/styles/main.scss';
import { TabletsPage } from './pages/TabletsPage/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage/AccessoriesPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PhoneDetails } from './pages/PhonesPage/PhoneDetails';
import { Product } from './types/Product';
import { getProducts } from './api/products';
import { TabletsDetails } from './pages/TabletsPage/TabletsDetails';
import { ProductContext } from './contexts/ProductContext';
import { AccessoryDetails } from './pages/AccessoriesPage/AccessoryDetails';

const App = () => {
  const scrollToRef = useRef(null);
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const data = await getProducts();

    setProducts(data);

    return data;
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={products}>
      <div className="App">
        <Header
          scrollToRef={scrollToRef}
        />

        <Routes>
          <Route path="/">

            {/* {!products.length && (
              <Route
                index
                element={<div className="container" />} // TODO: handle loader;
              />
            )} */}
            {!!products.length && (
              <Route
                index
                element={<HomePage />}
              />
            )}
            <Route path="home" element={<Navigate to="/" />} />
          </Route>

          <Route path="/phones">
            {!!products.length && (
              <>
                <Route
                  index
                  element={(
                    <PhonesPage
                      title="Mobile Phones"
                      pageType="phone"
                    />
                  )}
                />

                <Route
                  path=":productId"
                  element={<PhoneDetails />}
                />
              </>
            )}
          </Route>

          <Route path="/tablets">
            {!!products.length && (
              <>
                <Route
                  index
                  element={(
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
              </>
            )}

          </Route>

          {/* TODO: make page work if there is info from server  */}

          <Route path="/accessories">
            {!!products.length && (
              <>
                <Route
                  index
                  element={(
                    <AccessoriesPage
                      title="Accessories"
                      pageType="accessory"
                    />
                  )}
                />
                <Route path=":productId" element={<AccessoryDetails />} />
              </>
            )}
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        <Footer scrollToRef={scrollToRef} />
      </div>
    </ProductContext.Provider>
  );
};

export default App;
