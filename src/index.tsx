import ReactDOM from 'react-dom';
import {
  HashRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import App from './App';
import { ProductsProvider } from './helpers/ProductsContext';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';

const Root = () => (
  <HashRouter>
    <ProductsProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<p>Page not found</p>} />
          <Route index element={<HomePage />} />

          <Route path="phones" element={<PhonesPage />} />
        </Route>
      </Routes>
    </ProductsProvider>
  </HashRouter>
);

ReactDOM.render(
  <Root />,
  document.getElementById('root'),
);
