import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage/HomePage';
import { CategoryPage } from './modules/CategoryPage/CategoryPage';
import { GlobalStateProvider } from './store/GlobalProvider';
// eslint-disable-next-line max-len
import { ProductDetailsPage } from './modules/ProductDetailsPage/ProductDetailsPage';
import { Favourites } from './components/Favourites/Favourites';
import { Shopping } from './components/Shopping/Shopping';
import { NotFound } from './modules/NotFound/NotFound';

export const Root = () => (
  <Router>
    <GlobalStateProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to=".." />} />
          <Route path=":category">
            <Route index element={<CategoryPage />} />
            <Route path=":productId" element={<ProductDetailsPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="favourites" element={<Favourites />} />
          <Route path="cart" element={<Shopping />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </GlobalStateProvider>
  </Router>
);
