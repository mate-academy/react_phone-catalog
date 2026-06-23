import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomePage } from './components/HomePage/HomePage';
import { Header } from './components/Header/Header';
import { PhonesPage } from './components/PhonesPage/PhonesPage';
import { Footer } from './components/Footer/Footer';
import { TabletsPage } from './components/TabletsPage/TabletsPage';
import { AccessoriesPage } from './components/AccessoriesPage/AccessoriesPage';
// eslint-disable-next-line
import { ProductDetailsPage } from './components/ProductDetailsPage/ProductDetailsPage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { FavoritesPage } from './components/FavoritesPage/FavoritesPage';
import { CartPage } from './components/CartPage/CartPage';

export const App = () => (
  <div className="App">
    <h1 className="hidden">Product Catalog</h1>
    <Header />

    <main className="App__content">
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/phones">
          <Route index element={<PhonesPage />} />
          <Route path=":productId" element={<ProductDetailsPage />} />
        </Route>
        <Route path="/tablets">
          <Route index element={<TabletsPage />} />
          <Route path=":productId" element={<ProductDetailsPage />} />
        </Route>
        <Route path="/accessories">
          <Route index element={<AccessoriesPage />} />
          <Route path=":productId" element={<ProductDetailsPage />} />
        </Route>
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/cart" element={<CartPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>

    <Footer />
  </div>
);
