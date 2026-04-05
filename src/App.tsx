import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomePage } from './modules/HomePage';
import { NotFoundPage } from './modules/NotFoundPage';
import { Layout } from './components/Layout';
import { ThemeProvider } from './context/ThemeContext';
import { CartPage } from './modules/CartPage';
import { CartProvider } from './context/CartContext';
import { FavouritesProvider } from './context/FavouritesContext';
import { CategoryPage } from './modules/CategoryPage';
import { FavouritesPage } from './modules/FavouritesPage';
import { CategoriesType, PathType } from './types/Types';
import { ProductDetailsPage } from './modules/ProductDetailsPage/ProductDetailsPage';

export const App = () => (
  <div className="App">
    <ThemeProvider>
      <CartProvider>
        <FavouritesProvider>
          <HashRouter>
            <Routes>
              <Route path={PathType.HOME} element={<Layout />}>
                <Route index element={<HomePage />} />

                <Route
                  path={PathType.PHONES}
                  element={
                    <CategoryPage
                      title={'Mobile phones'}
                      category={CategoriesType.PHONES}
                    />
                  }
                ></Route>
                <Route
                  path={PathType.TABLETS}
                  element={
                    <CategoryPage
                      title={'Tablets'}
                      category={CategoriesType.TABLETS}
                    />
                  }
                ></Route>
                <Route
                  path={PathType.ACCESSORIES}
                  element={
                    <CategoryPage
                      title={'Accessories'}
                      category={CategoriesType.ACCESSORIES}
                    />
                  }
                ></Route>

                <Route
                  path={PathType.FAVOURITES}
                  element={<FavouritesPage />}
                ></Route>
                <Route path={PathType.CART} element={<CartPage />}></Route>
                <Route
                  path="/product/:productId"
                  element={<ProductDetailsPage />}
                />
                <Route path="*" element={<NotFoundPage />}></Route>
              </Route>
            </Routes>
          </HashRouter>
        </FavouritesProvider>
      </CartProvider>
    </ThemeProvider>
  </div>
);
