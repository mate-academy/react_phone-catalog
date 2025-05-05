import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { App } from './App';

import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { HomePage } from './pages/HomePage';
import { FavoritePage } from './pages/FavoritePage';
import { ShopPage } from './pages/ShopPage';
import { PhonePage } from './pages/ModelsPage';
import { ProductPage } from './pages/ProductPage';
import { CategoryWrapperPage } from './pages/CategoryWraperPage';
import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeProvider } from './context/ThemeContext';

export const Root = () => (
  <ThemeProvider>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path=":category" element={<CategoryWrapperPage />}>
              <Route index element={<PhonePage />} />
              <Route path=":id" element={<ProductPage />} />
            </Route>
            <Route path="favorites" element={<FavoritePage />} />
            <Route path="shop" element={<ShopPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  </ThemeProvider>
);
