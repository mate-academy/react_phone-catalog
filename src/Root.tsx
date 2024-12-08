import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { PageNotFound } from './pages/PageNotFound';
import { FavouritesPage } from './pages/FavouritesPage';
import { CartPage } from './pages/CartPage';
import { ProductPage } from './pages/ProductPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path='/' element={<App />} >
        <Route index element={<HomePage />} />

        <Route path='home' element={<Navigate to='/' />} />

        <Route path='phones'>
          <Route index element={<PhonesPage />} />
          <Route path=':productId' element={<ProductPage />} />
        </Route>

        <Route path='tablets'>
          <Route index element={<TabletsPage />} />
          <Route path=':productId' element={<ProductPage />} />
        </Route>

        <Route path='accessories'>
          <Route index element={<AccessoriesPage />} />
          <Route path=':productId' element={<ProductPage />} />
        </Route>

        <Route path='favourites' element={<FavouritesPage />} />
        <Route path='cart' element={<CartPage />} />

        <Route path='*' element={<PageNotFound />} />
      </Route>
    </Routes>
  </Router>
);