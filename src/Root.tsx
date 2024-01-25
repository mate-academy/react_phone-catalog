import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomeRedirect } from './HomeRedirect';
import { NotFoundPage } from './NotFoundPage';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="home" element={<HomeRedirect />} />
          {/* <Route index element={<HomePage />} /> */}

          <Route path="phones">
            {/* <Route index element={<PhonesPage />} /> */}
            {/* <Route path=":productId?" element={<ProductDetailsPage />} /> */}
          </Route>

          <Route path="tablets">
            {/* <Route index element={<TabletsPage />} /> */}
            {/* <Route path=":productId?" element={<ProductDetailsPage />} /> */}
          </Route>

          <Route path="accessories">
            {/* <Route index element={<AccessoriesPage />} /> */}
            {/* <Route path=":productId?" element={<ProductDetailsPage />} /> */}
          </Route>

          {/* <Route path="cart" element={<CartPage />} /> */}

          {/* <Route path="favourites" element={<FavouritesPage />} /> */}

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
