import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { HomePage } from './modules/HomePage';
import { PhonePage } from './modules/PhonesPage';
import { TabletsPage } from './modules/TabletsPage';
import { AccessoriesPage } from './modules/AccessoriesPage';
import { ShoppingCart } from './modules/ShoppingCartPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { PageNotFound } from './modules/PageNotFound';

const Root = () => (
  <Provider store={store}>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="phones" element={<PhonePage />} />
          <Route path="tablets" element={<TabletsPage />} />
          <Route path="accessories" element={<AccessoriesPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="shopping-cart" element={<ShoppingCart />} />

          <Route path=":category/:productId" element={<ProductDetailsPage />} />

          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  </Provider>
);

createRoot(document.getElementById('root') as HTMLElement).render(<Root />);
