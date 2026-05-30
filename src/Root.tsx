import { App } from './App';
import './App.scss';
import { HashRouter, Route, Routes } from 'react-router-dom';
import PhonePage from './modules/PhonePage/PhonePage';
import TabletsPage from './modules/TabletsPage/TabletsPage';
import AccessoriesPage from './modules/AccessoriesPage/AccessoriesPage';
import NotFoundPage from './modules/NotFoundPage/NotFoundPage';
import HomePage from './modules/HomePage/HomePage';
import { store } from './features/store';
import { Provider } from 'react-redux';
import ItemCardPage from './modules/ItemCardPage/ItemCardPage';
import FavouritesPage from './modules/FavouritesPage/FavouritesPage';
import CartPage from './modules/CartPage/CartPage';

export const Root = () => (
  <Provider store={store}>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          {/* <Route path="phones" element={<PhonePage />} /> */}
          <Route path="phones">
            <Route index element={<PhonePage />} />
            <Route path=":deviceId" element={<ItemCardPage />} />
          </Route>
          <Route path="tablets">
            <Route index element={<TabletsPage />} />
            <Route path=":deviceId" element={<ItemCardPage />} />
          </Route>
          <Route path="accessories">
            <Route index element={<AccessoriesPage />} />
            <Route path=":deviceId" element={<ItemCardPage />} />
          </Route>
          <Route path="favourites" element={<FavouritesPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  </Provider>
);
