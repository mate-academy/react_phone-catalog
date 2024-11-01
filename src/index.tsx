import { createRoot } from 'react-dom/client';
import { App } from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Home } from './components/home';
import { ProductDetail } from './components/productDetail';
import { Products } from './components/products';
import { Favorite } from './components/favorite';

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
          <Route path="phones/*" element={<Products category={phones} />}>
            <Route path=":itemId" element={<ProductDetail />} />
          </Route>
          <Route path="tablets/*" element={<Products category={tablets} />}>
            <Route path=":itemId" element={<ProductDetail />} />
          </Route>
          <Route
            path="accessories/*"
            element={<Products category={accessories} />}
          >
            <Route path=":itemId" element={<ProductDetail />} />
          </Route>
          <Route path="favorites" element={<Favorite />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  </Provider>,
);
