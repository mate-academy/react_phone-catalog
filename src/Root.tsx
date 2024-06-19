import { Provider } from 'react-redux';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { CatalogProvider } from './pages/CatalogContext';
import { HomePage } from './pages/HomePage/HomePage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { ProductPage } from './pages/ProductPage/ProductPage';
import { persistor, store } from './app/store';
import { Category } from './types/category';
import { ProductDetails } from './pages/ProductDetailsPage/ProductDetailsPage';
import { FavouritesPage } from './pages/FavouritesPage/FavouritesPage';
import { PersistGate } from 'redux-persist/integration/react';
import { CartPage } from './pages/CartPage/CartPage';

export const Root = () => {
  const prodCategories = [
    {
      route: 'phones',
      category: Category.PHONES,
    },
    {
      route: 'tablets',
      category: Category.TABLETS,
    },
    {
      route: 'accessories',
      category: Category.ACCESSORIES,
    },
  ];

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CatalogProvider>
          <Router>
            <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<HomePage />} />
                {prodCategories.map(({ route, category }) => {
                  return (
                    <Route path={`/${route}`} key={route}>
                      <Route
                        index
                        element={
                          <ProductPage title={route} category={category} />
                        }
                      />
                      <Route path=":productId" element={<ProductDetails />} />
                    </Route>
                  );
                })}
                <Route path="/favourites" element={<FavouritesPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </Router>
        </CatalogProvider>
      </PersistGate>
    </Provider>
  );
};
