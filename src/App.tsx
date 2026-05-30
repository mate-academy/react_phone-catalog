import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { FavouritesProvider } from './modules/shared/context/FavouritesContext';
import { HomePage } from './modules/HomePage/components/HomePage';
import { Favorites } from './modules/Favourites/Favorites';
import { useProducts } from './modules/shared/context/ProductsContext';
import { GadgetPage } from './modules/GadgetPage/GadgetPage';
import { ScrollToTop } from './modules/shared/ScrollToTop';
// eslint-disable-next-line max-len
import { ProductDetailsPage } from './modules/ProductDetailsPage/ProductDetailsPage';
import { Menu } from './modules/HomePage/components/Menu';
import { CartPage } from './modules/CartPage/CartPage';
import { CartProvider } from './modules/shared/context/CartContext';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';
import { ThemeProvider } from './modules/shared/context/ThemeContext';
import './i18n';

export const App = () => {
  const { phones, tablets, accessories } = useProducts();

  return (
    <ThemeProvider>
      <FavouritesProvider>
        <CartProvider>
          <ScrollToTop />
          <div className="App">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/cart" element={<CartPage />} />
              <Route
                path="/phones"
                element={
                  <GadgetPage
                    gadgets={phones}
                    category="Phones"
                    title="Mobile phones"
                  />
                }
              />
              <Route
                path="/tablets"
                element={
                  <GadgetPage
                    gadgets={tablets}
                    category="Tablets"
                    title="Tablets"
                  />
                }
              />
              <Route
                path="/accessories"
                element={
                  <GadgetPage
                    gadgets={accessories}
                    category="Accessories"
                    title="Accessories"
                  />
                }
              />
              <Route
                path="/product/:productId"
                element={<ProductDetailsPage />}
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </CartProvider>
      </FavouritesProvider>
    </ThemeProvider>
  );
};
