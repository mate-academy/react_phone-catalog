import {
  HashRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import App from './App';
import { NotFoundPage } from './pages/NotFoundPage';
import { HomePage } from './pages/HomePage';
import { ProductsProvider } from './context/ProductsContext';

export const Root = () => {
  return (
    <ProductsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="home" element={<HomePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </ProductsProvider>
  );
};
