import { createRoot } from 'react-dom/client';
import { App } from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Home } from './components/home';
import { Phones } from './components/phones';
import { ProductDetail } from './components/productDetail';

const NotFound = () => {
  return <h2>404: Page Not Found</h2>;
};

const phones = 'phones';
const tablets = 'tablets';
const accessories = 'accessories';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="phones/*" element={<Phones category={phones} />}>
            <Route path=":itemId" element={<ProductDetail />} />
          </Route>
          <Route path="tablets/*" element={<Phones category={tablets} />}>
            <Route path=":itemId" element={<ProductDetail />} />
          </Route>
          <Route
            path="accessories/*"
            element={<Phones category={accessories} />}
          >
            <Route path=":itemId" element={<ProductDetail />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  </Provider>,
);
