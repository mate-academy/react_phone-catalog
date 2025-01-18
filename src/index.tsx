import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { HomePage } from './components/HomePage';
import { PageNotFound } from './components/PageNotFound';
import { Phones } from './components/ProductPage/Phones';
import { Tablets } from './components/ProductPage/Tablets';
import { Accessories } from './components/ProductPage/Accessories';
import { DetailProdPage } from './components/DetailProdPage';
import { Favorites } from './components/Favorites';
import { CartPage } from './components/CartPage';

const Root: React.FC = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="*" element={<PageNotFound />} />
            <Route index element={<HomePage />} />
            <Route path="phones">
              <Route index element={<Phones />} />
              <Route path=":prodId" element={<DetailProdPage />} />
            </Route>
            <Route path="tablets">
              <Route index element={<Tablets />} />
              <Route path=":prodId" element={<DetailProdPage />} />
            </Route>
            <Route path="accessories">
              <Route index element={<Accessories />} />
              <Route path=":prodId" element={<DetailProdPage />} />
            </Route>

            <Route path="favorites" element={<Favorites />} />

            <Route path="cart" element={<CartPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </Provider>
  );
};

createRoot(document.getElementById('root') as HTMLElement).render(<Root />);
