import ReactDOM from 'react-dom';
import {
  HashRouter, Navigate, Route, Routes,
} from 'react-router-dom';
import './styles/style.scss';

import App from './App';

import './App.scss';
import './styles/blocks/slider.scss';
import { Home } from './components/Home';
import { ProductsProvider } from './components/ProductsContext';
import { PhonesPage } from './components/PhonesPage';

ReactDOM.render(
  <ProductsProvider>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="*" element={<h1 className="title">Page not found</h1>} />
          <Route index element={<Home />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="phones" element={<PhonesPage />} />
        </Route>
      </Routes>
    </HashRouter>
  </ProductsProvider>,
  document.getElementById('root'),
);
