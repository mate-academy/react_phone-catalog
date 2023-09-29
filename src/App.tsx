import './App.scss';
import {
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import PhonesPage from './pages/PhonesPage/PhonesPage';
import HomePage from './pages/HomePage/HomePage';
import TabletsPage from './pages/TabletsPage/TabletsPage';
import CartPage from './pages/CartPage/CartPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import ProductDetailsPage from './pages/ProductDetailsPage/ProductDetailsPage';
import AccessoriesPage from './pages/AccessoriesPage/AccessoriesPage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

const Layout = () => {
  return (
    <div className="app">
      <Header />
      <main className="main">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

const App = () => (
  <Routes>
    <Route
      path="/"
      element={<Layout />}
    >
      <Route
        path="/"
        element={<HomePage />}
      />
      <Route
        path="phones"
        element={<PhonesPage />}
      />
      <Route
        path="phones/:productId"
        element={<ProductDetailsPage />}
      />
      <Route
        path="tablets"
        element={<TabletsPage />}
      />
      <Route
        path="tablets/:productId"
        element={<ProductDetailsPage />}
      />
      <Route
        path="accessories"
        element={<AccessoriesPage />}
      />
      <Route
        path="accessories/:ProductId"
        element={<ProductDetailsPage />}
      />
      <Route
        path="favorites"
        element={<FavoritesPage title="Favorites not found" />}
      />
      <Route
        path="cart"
        element={<CartPage />}
      />
      <Route path="*" element={<NotFoundPage title="Page not found..." />} />
      <Route path="home" element={<Navigate to="/" replace />} />
    </Route>
  </Routes>

);

export default App;
