import { HashRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { Provider } from 'react-redux';
import store from './app/store';
import { HomePage } from './modules/HomePage/HomePage';
import ProductsPage from './modules/ProductsPage/ProductsPage';
import BreadCrumbs from './modules/_shared/BreadCrumbs/BreadCrumbs';

export const Root = () => (
  <Provider store={store}>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="phones" element={<ProductsPage variant='phones' />} />
          <Route path="tablets" element={<ProductsPage variant='tabless' />} />
          <Route path="accessories" element={<ProductsPage variant='accesories' />} />
          <Route path="cart" element={<></>} />
          <Route path="favorites" element={<></>} />
          <Route path="*" element={<BreadCrumbs />} />
        </Route>
      </Routes>
    </HashRouter>
  </Provider>
);
