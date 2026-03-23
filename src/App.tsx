import { Route, Routes } from 'react-router-dom';
import './assets/styles/main.scss';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { Cart } from './modules/Cart';
import { ProductPage } from './modules/ProductPage';
import { Favourites } from './modules/Favourites';
import { HomePage } from './modules/HomePage';
import { PageNotFound } from './modules/PageNotFound';
import { ProductDetails } from './modules/ProductDetails';
import { ProductsProvider } from './store/ProductsProvider';
import { Catalog } from './modules/Catalog';
import { FavouritesProvider } from './store/favourites/FavouritesProvider';
import { CartProvider } from './store/cart/CartProvider';
import { Checkout } from './modules/Checkout';
import { OrderProvider } from './store/OrderProvider/OrderProvider';
import { Confirm } from './components/layout/Confirm';

export const App = () => {
  return (
    <FavouritesProvider>
      <CartProvider>
        <OrderProvider>
          <div className="app">
            <Header />
            <main className="wrapper">
              <ProductsProvider>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="*" element={<PageNotFound />} />
                  <Route path="/favourites" element={<Favourites />} />
                  <Route path="/cart" element={<Cart />} />

                  <Route path="/:orderId" element={<Checkout />} />
                  <Route path="/confirm" element={<Confirm />} />

                  <Route path="/catalog">
                    <Route index element={<Catalog />} />

                    <Route path=":category">
                      <Route index element={<ProductPage />} />
                      <Route path=":productId" element={<ProductDetails />} />
                    </Route>
                  </Route>
                </Routes>
              </ProductsProvider>
            </main>
            <Footer />
          </div>
        </OrderProvider>
      </CartProvider>
    </FavouritesProvider>
  );
};
