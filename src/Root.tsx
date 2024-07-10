import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { App } from './App';
import MainPage from './components/MainPage';
import { ProductContextProvider } from './contexts/ProductContextProvider';
import CatalogPage from './components/CatalogPage';
import { CartContextProvider } from './contexts/CartContextProvider';
import { LikeContextProvider } from './contexts/LikeContextProvider';
import CardPage from './components/CardPage';
import { MenuContextProvider } from './contexts/MenuContextProvider';
import FavouritesPage from './components/FavouritesPage';
import CartPage from './components/CartPage';

export const Root = () => {
  return (
    <MenuContextProvider>
      <ProductContextProvider>
        <CartContextProvider>
          <LikeContextProvider>
            <Router>
              <Routes>
                <Route path="/" element={<App />}>
                  <Route index element={<MainPage />} />
                  <Route path="/favourites" element={<FavouritesPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path=":productId">
                    <Route path=":itemId" element={<CardPage />} />
                    <Route index element={<CatalogPage />} />
                  </Route>
                </Route>
              </Routes>
            </Router>
          </LikeContextProvider>
        </CartContextProvider>
      </ProductContextProvider>
    </MenuContextProvider>
  );
};
