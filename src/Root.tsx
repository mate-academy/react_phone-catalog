import { App } from './App';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage';
import { CardPage } from './pages/CardPage/CardPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="phones">
          {/* <Route index element={<PhonesPage />} />
          <Route path=":productId?" element={<DetailsPage />} /> */}
        </Route>

        <Route path="tablets">
          {/* <Route index element={<TabletsPage />} />
          <Route path=":productId?" element={<DetailsPage />} /> */}
        </Route>

        <Route path="accessories">
          {/* <Route index element={<AccessoriesPage />} />
          <Route path=":productId?" element={<DetailsPage />} /> */}
        </Route>

        <Route path="favourites" element={<FavoritesPage />} />
        <Route path="cart" element={<CardPage />} />

        <Route path="*" element={<p> not found </p>} />
      </Route>
    </Routes>
  </Router>
);
