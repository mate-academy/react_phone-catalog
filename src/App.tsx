import React from 'react';
import styles from './App.module.scss';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import {
  HomePage,
  ProductByCategoryPage,
  ProductDetailsPage,
  FavouritesPage,
  CartPage,
  NotFoundPage,
} from './pages';
import { AppContext } from './AppContext';

export const App: React.FC = () => {
  const { products } = React.useContext(AppContext);

  const phoneItems = React.useMemo(
    () => products?.filter(item => item.category === 'phones') || null,
    [products],
  );

  const tabletItems = React.useMemo(
    () => products?.filter(item => item.category === 'tablets') || null,
    [products],
  );

  const accessoriesItems = React.useMemo(
    () => products?.filter(item => item.category === 'accessories') || null,
    [products],
  );

  return (
    <div className={styles.App}>
      <Header />
      <main className={styles.container}>
        <Routes>
          <Route path="/">
            <Route index element={<HomePage />} />

            <Route path="phones">
              <Route
                index
                element={
                  <ProductByCategoryPage
                    products={phoneItems}
                    category="phones"
                  />
                }
              />
              <Route
                path=":phoneId"
                element={<ProductDetailsPage category="phones" />}
              />
            </Route>

            <Route path="tablets">
              <Route
                index
                element={
                  <ProductByCategoryPage
                    products={tabletItems}
                    category="tablets"
                  />
                }
              />
              <Route
                path=":tabletId"
                element={<ProductDetailsPage category="tablets" />}
              />
            </Route>

            <Route path="accessories">
              <Route
                index
                element={
                  <ProductByCategoryPage
                    products={accessoriesItems}
                    category="accessories"
                  />
                }
              />
              <Route
                path=":accessoryId"
                element={<ProductDetailsPage category="accessories" />}
              />
            </Route>

            <Route path="favourites" element={<FavouritesPage />} />
            <Route path="cart" element={<CartPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};
