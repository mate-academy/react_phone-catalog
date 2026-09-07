import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { BurgerProvider } from './shared/context/BurgerContext';
import { ProductProvider } from './shared/context/ProductsContext';
import { HomePage } from './modules/HomePage';
import { Phones } from './modules/Phones';
import { Tablets } from './modules/Tablets';
import { Accessories } from './modules/Accessories';
import { ItemCard } from './modules/ItemCard';
import { NotFoundPage } from './modules/NotFoundPage';
import { Favourites } from './modules/Favourites';
import { ShoppingBag } from './modules/ShoppingBag';
import { RightButtonProvider } from './shared/context/RightButtonContext';
import { ScrollToTop } from './shared/ScrollToTop/ScrollToTop';
import { Suspense } from 'react';

export const Root = () => (
  <ProductProvider>
    <BurgerProvider>
      <RightButtonProvider>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<HomePage />} />
                <Route path="home">
                  <Route index element={<HomePage />} />
                  <Route path=":productId" element={<ItemCard />} />
                </Route>
                <Route path="phones">
                  <Route index element={<Phones />} />
                </Route>
                <Route path="tablets">
                  <Route index element={<Tablets />} />
                </Route>
                <Route path="accessories">
                  <Route index element={<Accessories />} />
                </Route>
                <Route path="favourites">
                  <Route index element={<Favourites />} />
                </Route>
                <Route path="shopping-bag">
                  <Route index element={<ShoppingBag />} />
                </Route>
                <Route path=":productId" element={<ItemCard />} />
                <Route path="not-found" element={<NotFoundPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </Suspense>
        </Router>
      </RightButtonProvider>
    </BurgerProvider>
  </ProductProvider>
);
