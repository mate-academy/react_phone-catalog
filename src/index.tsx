import ReactDOM from 'react-dom';
import {
  HashRouter, Navigate, Route, Routes,
} from 'react-router-dom';
import './styles/style.scss';

import App from './App';

import './styles/blocks/slider.scss';
import './App.scss';
import { Home } from './components/Home';
import { ProductsProvider } from './components/ProductsContext';
import { PhonesPage } from './components/PhonesPage';
import { TabletsPage } from './components/TabletsPage';
import { AccessoriesPage } from './components/AccessoriesPage';
import { ProductDetailsPage } from './components/ProductDetailsPage';

ReactDOM.render(
  <ProductsProvider>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="*" element={<h1 className="title">Page not found</h1>} />
          <Route index element={<Home />} />
          <Route path=":slug" element={<ProductDetailsPage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="phones/">
            <Route index element={<PhonesPage />} />
            <Route path=":slug" element={<ProductDetailsPage />} />
          </Route>
          <Route path="tablets/">
            <Route index element={<TabletsPage />} />
            <Route path=":slug" element={<ProductDetailsPage />} />
          </Route>
          {/* <Route path="tablets" element={<TabletsPage />} /> */}
          <Route path="accessories" element={<AccessoriesPage />} />
        </Route>
      </Routes>
    </HashRouter>
  </ProductsProvider>,
  document.getElementById('root'),
);
