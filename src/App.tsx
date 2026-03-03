import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomePage } from './modules/HomePage';
import { NotFoundPage } from './modules/NotFoundPage';
import { Layout } from './components/Layout';
import { ThemeProvider } from './context/ThemeContext';
import { CartPage } from './modules/CartPage';
import { CartProvider } from './context/CartContext';
import { FavouritesProvider } from './context/FavoritesContext';
import { FavouritesPage } from './modules/FavouritesPage';
import { CategoryPage } from './modules/PhonesPage';
import { PathType } from './types/Types';

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
                    <CategoryPage title={'Mobile phones'} category={'phones'} />
                  }
                ></Route>
                <Route
                  path={PathType.TABLETS}
                  element={
                    <CategoryPage title={'Tablets'} category={'tablets'} />
                  }
                ></Route>
                <Route
                  path={PathType.ACCESSORIES}
                  element={
                    <CategoryPage
                      title={'Accessories'}
                      category={'accessories'}
                    />
                  }
                ></Route>

                <Route
                  path={PathType.FAVOURITES}
                  element={<FavouritesPage />}
                ></Route>
                <Route path={PathType.CART} element={<CartPage />}></Route>
                <Route
                  path={`:${PathType.CATEGORY}/:${PathType.PRODUCT_ID}`}
                  element={<div>Page details</div>}
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
