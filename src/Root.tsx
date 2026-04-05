import { HashRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { ThemeProvaider } from './context/ThemeContext';
import { HomePage } from './modules/HomePage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { PathType } from './types/Types';
import { ProductPage } from './modules/ProductPage';
import { NotFoundPage } from './modules/NotFoundPage';
import { FavoritesProvider } from './context/FavoriteContext';
import { FavoritePage } from './modules/FavoritePage';

export const Root = () => {
  return (
    <ThemeProvaider>
      <FavoritesProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />
              <Route
                path="product/:productId"
                element={<ProductDetailsPage />}
              />
              <Route
                path={PathType.PHONES}
                element={
                  <ProductPage
                    title="Mobile phones"
                    category={PathType.PHONES}
                  />
                }
              />
              <Route
                path={PathType.TABLETS}
                element={
                  <ProductPage title="Tablets" category={PathType.TABLETS} />
                }
              />
              <Route
                path={PathType.ACCESSORIES}
                element={
                  <ProductPage
                    title="Accessories"
                    category={PathType.ACCESSORIES}
                  />
                }
              />
              <Route path={PathType.FAVOURITES} element={<FavoritePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </HashRouter>
      </FavoritesProvider>
    </ThemeProvaider>
  );
};
