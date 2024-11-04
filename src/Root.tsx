import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage';
import { ContextProvider } from './ContextProvider';
import { ProductsPage } from './modules/ProductsPage';
// import { TabletsPage } from './modules/TabletsPage';

export const Root = () => (
  <ContextProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" />} />
          <Route path="phones" element={<ProductsPage />} />
          <Route path="tablets" element={<ProductsPage />} />
          <Route path="accessories" element={<ProductsPage />} />
          {/*<Route path="*" element={<Navigate to="/" />} />*/}
        </Route>
      </Routes>
    </Router>
  </ContextProvider>
);
