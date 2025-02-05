import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { Layout } from './components/Layout';
import { HomePage } from './modules/HomePage';
import { Menu } from './modules/Menu';
import { ProductsProvider } from './store/ProductsContext';

export const Root = () => (
  <Router>
    <ProductsProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="home" element={<Navigate to="/" />} />
            <Route path="menu" element={<Menu />} />
          </Route>
        </Routes>
      </Layout>
    </ProductsProvider>
  </Router>
);
