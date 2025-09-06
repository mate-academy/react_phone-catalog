import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import { PhonesPage } from './components/PhonesPage';
import { TabletsPage } from './components/TabletsPage';
import { AccessoriesPage } from './components/AccessoriesPage';
import { FavoritesPage } from './components/FavoritesPage';
import { CartPage } from './components/CartPage';
import { Footer } from './components/Footer';

export const App = () => (
  <div className="app">
    <Header />
    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="phones">
            <Route index element={<PhonesPage />} />
            <Route path=":id" element={<PhonesPage />} />
          </Route>
          <Route path="tablets">
            <Route index element={<TabletsPage />} />
            <Route path=":id" element={<TabletsPage />} />
          </Route>
          <Route path="accessories">
            <Route index element={<AccessoriesPage />} />
            <Route path=":id" element={<AccessoriesPage />} />
          </Route>
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="cart" element={<CartPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </main>
    <Footer />
  </div>
);
