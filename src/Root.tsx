import { HashRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage/HomePage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';

export const Root = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          {/* <Route path="phones" element={<PhonesPage />} />
          <Route path="tablets" element={<TabletsPage />} />
          <Route path="accessories" element={<AccessoriesPage />} />
          <Route path="product">
            <Route path=":productId" element={<ProductDetailsPage />} />
          </Route>
          <Route path="cart" element={<CartPage />} />
          <Route path="favorites" element={<Favorites />} /> */}

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
