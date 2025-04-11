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

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <LocalStorageContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />


            <Route path={routes.phones} element={<Phones />}>
              <Route path=":id" element={<ProductDetails />} />
            </Route>

            <Route path={routes.tablets} element={<Tablets />}>
              <Route path=":id" element={<ProductDetails />} />
            </Route>

            <Route path={routes.accessories} element={<Accessories />}>
              <Route path=":id" element={<ProductDetails />} />
            </Route>

            <Route path={routes.fav} element={<Favorites />}>
              <Route path=":id" element={<ProductDetails />} />
            </Route>

            <Route path={routes.cart} element={<Cart />}>
              <Route path=":id" element={<ProductDetails />} />
            </Route>


            <Route path="*" element={<p>Page not found</p>}></Route>
          </Route>
        </Routes>
      </Router>
    </LocalStorageContextProvider>
  </Provider>,
);
