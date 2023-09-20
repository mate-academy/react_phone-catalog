import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/Footer/Footer';
import { NavBar } from './components/NavBar/NavBar';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartPage } from './pages/CartPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { NotFoundPage } from './pages/NotFoundPage';

const App = () => (
  <div className="App">
    <header className="header">
      <NavBar />
    </header>

    <main className="main">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />

        <Route path="phones">
          <Route index element={<PhonesPage />} />
          <Route path=":itemId" element={<ProductDetailsPage />} />
        </Route>

        <Route path="tablets">
          <Route index element={<TabletsPage />} />
          <Route path=":itemId" element={<ProductDetailsPage />} />
        </Route>

        <Route path="accessories" element={<AccessoriesPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="favourites" element={<FavoritesPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>

    <footer className="footer">
      <Footer />
    </footer>
  </div>
);

export default App;
