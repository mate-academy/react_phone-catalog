import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import { AccessoriesPage } from './components/AccesoriesPage';
import { HomePage } from './components/HomePage';
import { PhonesPage } from './components/PhonesPage';
import { TabletsPage } from './components/TabletsPage';
import { App } from './App';
import { ProductsProvider } from './store/ProductsContext';

export const Root = () => (
  <Router>
    <ProductsProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="phones" element={<PhonesPage />} />
          <Route path="tablets" element={<TabletsPage />} />
          <Route path="accessories" element={<AccessoriesPage />} />
          {/* <Route path="*" element={<p>Not found</p>} /> */}
        </Route>
      </Routes>
    </ProductsProvider>
  </Router>
);
