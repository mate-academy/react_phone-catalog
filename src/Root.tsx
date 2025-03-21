import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { App } from './App';
import { FavoriteProvider } from './context/FavoriteContext';
import { ShopProvider } from './context/ShopContext';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { HomePage } from './pages/HomePage';
import { FavoritePage } from './pages/FavoritePage';
import { ShopPage } from './pages/ShopPage';
import { PhonePage } from './pages/ModelsPage';
import { ProductPage } from './pages/ProductPage';
import { ProductsProvider } from './context/ProductsContext';
import { CategoryWrapperPage } from './pages/CategoryWraperPage';

export const Root = () => (
  <Router>
    <ProductsProvider>
      <FavoriteProvider>
        <ShopProvider>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />
              <Route path=":category" element={<CategoryWrapperPage />}>
                <Route index element={<PhonePage />} />
                <Route path=":id" element={<ProductPage />} />
              </Route>
              <Route path="favorites" element={<FavoritePage />} />
              <Route path="shop" element={<ShopPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </ShopProvider>
      </FavoriteProvider>
    </ProductsProvider>
  </Router>
);
