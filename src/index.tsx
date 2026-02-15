import { createRoot } from 'react-dom/client';
import { App } from './App';
import { Provider } from 'react-redux';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import './styles/global.scss';
import { HomePage } from './modules/HomePage';
import { CartPage } from './modules/CartPage';
import { ProductsPage } from './modules/ProductsPage';
import { NotFoundPage } from './modules/NotFoundPage';
import { store } from './app/store';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { ProductsParams } from './modules/ProductsPage/components';
import { FavouritesList } from './modules/FavouritesPage';

createRoot(document.getElementById('root') as HTMLElement).render(<App />);
const Root = () => (
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="phones" element={<ProductsPage />}>
            <Route index element={<ProductsParams />} />
            <Route path=":productId" element={<ProductDetailsPage />} />
          </Route>

          <Route path="tablets" element={<ProductsPage />}>
            <Route index element={<ProductsParams />} />
            <Route path=":productId" element={<ProductDetailsPage />} />
          </Route>

          <Route path="accessories" element={<ProductsPage />}>
            <Route index element={<ProductsParams />} />
            <Route path=":productId" element={<ProductDetailsPage />} />
          </Route>

          <Route path="cart" element={<CartPage />} />
          <Route path="favourites" element={<ProductsPage />}>
            <Route index element={<FavouritesList />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  </Provider>
);

createRoot(document.getElementById('root') as HTMLElement).render(<Root />);
