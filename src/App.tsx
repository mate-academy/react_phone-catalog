import { Route, Routes } from 'react-router-dom';
import './assets/styles/main.scss';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { Cart } from './modules/Cart';
import { Favourites } from './modules/Favourites';
import { HomePage } from './modules/HomePage';
import { PageNotFound } from './modules/PageNotFound';
import { ProductDetails } from './modules/ProductDetails';
import { Catalog } from './modules/Catalog';
import { FavouritesProvider } from './store/favourites/FavouritesProvider';
import { CartProvider } from './store/cart/CartProvider';
import { Checkout } from './modules/Checkout';
import { OrderProvider } from './store/order/OrderProvider';
import { Confirm } from './components/layout/Confirm';
import { ProductPageWrapper } from './modules/ProductPageWrapper';
import { ThemeProvider } from './store/theme/ThemeProvider';

export const App = () => {
  return (
    <ThemeProvider>
      <FavouritesProvider>
        <CartProvider>
          <OrderProvider>
            <div className="app">
              <Header />
              <main className="wrapper">
                {/* 1 opcja byla taka ze za pomoca providera przekazujemy wszystkie
              products na cala strone i pozniej na nim pracujemy

              teraz jest zrobione ze robi sie fetch w miejscu gdzie
              potrzebujemy products np. homepage products page */}

                {/* <ProductsProvider> */}
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="*" element={<PageNotFound />} />
                  <Route path="/favourites" element={<Favourites />} />

                  <Route path="/cart">
                    <Route index element={<Cart />} />

                    <Route path=":orderId">
                      <Route index element={<Checkout />} />
                      <Route path="confirm" element={<Confirm />} />
                    </Route>
                  </Route>

                  <Route path="/catalog">
                    <Route index element={<Catalog />} />

                    <Route path=":category">
                      <Route index element={<ProductPageWrapper />} />
                      <Route path=":productId" element={<ProductDetails />} />
                    </Route>
                  </Route>
                </Routes>
                {/* </ProductsProvider> */}
              </main>
              <Footer />
              {/* <ThemeAnim /> */}
            </div>
          </OrderProvider>
        </CartProvider>
      </FavouritesProvider>
    </ThemeProvider>
  );
};
