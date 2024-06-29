import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { PhonePage } from './Components/PhonePage';
import { HomePage } from './Components/HomePage/HomePage';
import { TabletsPage } from './Components/TabletsPage';
import { NotFoundPage } from './Components/NotFoundPage/NotFoundPage';
import { AccessoriesPage } from './Components/AccessoriesPage';
// eslint-disable-next-line max-len
import { ProductDetailPage } from './Components/ProductDetailPage/ProductDetailPage';
import { FavoritesPage } from './Components/FavoritesPage/FavoritesPage';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/phones">
            <Route index element={<PhonePage />} />
            <Route path=":productId?" element={<ProductDetailPage />} />
          </Route>

          <Route path="/tablets">
            <Route index element={<TabletsPage />} />
            <Route path=":productId?" element={<ProductDetailPage />} />
          </Route>
          <Route path="/accessories">
            <Route index element={<AccessoriesPage />} />
            <Route path=":productId" element={<ProductDetailPage />} />
          </Route>

          <Route path="favorites" element={<FavoritesPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};
