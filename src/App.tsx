import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header/Header';
import { HomePage } from './components/HomePage/HomePage';
import { Footer } from './components/Footer/Footer';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { CartPage } from './components/CartPage/CartPage';
import { FavoritesPage } from './components/FavoritesPage/FavoritesPage';
import { PhonesPage } from './components/PhonesPage/PhonesPage';
import { AccessoriesPage } from './components/AccessoriesPage/AccessoriesPage';
// eslint-disable-next-line
import { ProductDetailsPage } from './components/ProductDetailsPage/ProductDetailsPage';
import { TabletsPage } from './components/TabletsPage/TabletsPage';

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
