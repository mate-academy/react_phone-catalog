import { createRoot } from 'react-dom/client';
import { App } from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Home } from './components/home';
import { Phones } from './components/phones';
import { Tablets } from './components/tablets';
import { Accessories } from './components/accessories';
import { ProductDetail } from './components/productDetail';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="phones/*" element={<Phones />}>
            <Route
              path=":id"
              element={<ProductDetail selectedPhone={null} />}
            />
          </Route>
          <Route path="tablets" element={<Tablets />} />
          <Route path="accessories" element={<Accessories />} />
        </Route>
      </Routes>
    </HashRouter>
  </Provider>,
);
