// import { App } from './App';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Footer } from './modules/HomePage/components/Footer';
import { HomePage } from './modules/HomePage/components/HomePage';
import { Header } from './modules/HomePage/components/Header';
import { PhonePage } from './modules/PhonePage/components/PhonePage/PhonePage';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { App } from './App';
// eslint-disable-next-line max-len
import { NotFoundPage } from './modules/HomePage/components/NotFoundPage/NotFoundPage';
import { TabletsPage } from './modules/TabletsPage/components/TabletsPage';
// eslint-disable-next-line max-len
import { AccessoriesPage } from './modules/AccessoriesPage/AccessoriesPage/components/AccessoriesPage';
import { ProductDetailsPage } from './modules/shared/ProductDetailsPage';

export const Root = () => (
  <HashRouter>
    <Provider store={store}>
      <Header />
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="phones" element={<PhonePage />} />
          <Route path="tablets" element={<TabletsPage />} />
          <Route path="accessories" element={<AccessoriesPage />} />

          <Route path="/phones">
            <Route path=":productId" element={<ProductDetailsPage />} />
          </Route>

          <Route path="/tablets">
            <Route path=":productId" element={<ProductDetailsPage />} />
          </Route>

          <Route path="/accessories">
            <Route path=":productId" element={<ProductDetailsPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </Provider>
  </HashRouter>
);
