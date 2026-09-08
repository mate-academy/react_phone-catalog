import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import { store } from './app/store';
import { LocalStorageContextProvider } from './app/Contexts/LocalStorageContext';

import { App } from './App';
import { Home } from './components/modules/Home/Home';
import { Tablets } from './components/modules/Tablets/Tablets';
import { Phones } from './components/modules/Phones/Phones';
import { Cart } from './components/modules/Cart/Cart';
import { routes } from './components/shared/Routs/Routs';
import { Accessories } from './components/modules/Accessories/Accessories';
import { Favorites } from './components/modules/Favorites/Favorites';
import { ProductDetails } from './components/modules/ProductDetails/ProductDetails';
import { PageNotFound } from './components/modules/PageNotFound/PageNotFound';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <LocalStorageContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="404" element={<PageNotFound />} />
            <Route path=":id" element={<ProductDetails />} />{' '}
            <Route path={routes.phones}>
              <Route index element={<Phones />} />
              <Route path="404" element={<PageNotFound />} />
              <Route path=":id" element={<ProductDetails />} />{' '}
            </Route>
            <Route path={routes.tablets}>
              <Route index element={<Tablets />} />
              <Route path="404" element={<PageNotFound />} />
              <Route path=":id" element={<ProductDetails />} />
            </Route>
            <Route path={routes.accessories}>
              <Route index element={<Accessories />} />
              <Route path="404" element={<PageNotFound />} />
              <Route path=":id" element={<ProductDetails />} />{' '}
            </Route>
            <Route path={routes.fav}>
              <Route index element={<Favorites />} />
              <Route path="404" element={<PageNotFound />} />
              <Route path=":id" element={<ProductDetails />} />{' '}
            </Route>
            <Route path={routes.cart}>
              <Route index element={<Cart />} />
              <Route path="404" element={<PageNotFound />} />
              <Route path=":id" element={<ProductDetails />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Router>
    </LocalStorageContextProvider>
  </Provider>,
);
