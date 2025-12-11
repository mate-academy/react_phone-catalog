// src/App.tsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Phones from './pages/Phones';
import { phones } from './data/phones';
import Tablets from './pages/Tablets';
import { tablets } from './data/tablets';
import Accessories from './pages/Accessories';
import { accessories } from './data/accessories';
import { ViewAllProducts } from './pages/ViewAllProducts'; // default export
import Footer from './components/Footer';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import ShoppingCart from './pages/ShoppingCart/ShoppingCart';
import { CartProvider } from './pages/ShoppingCart';
import { FavoritesProvider } from './pages/Favorites/FavoritesContext';
import Favorites from './pages/Favorites/Favorites';
import NotFound from './pages/NotFound/NotFound';
import { ThemeProvider } from './context/ThemeContext';
import styles from './App.module.css';
import { ToastProvider } from './components/Toast/ToastContext';

// wrapper para usar navigate em Phones
const PhonesAllWrapper: React.FC = () => {
  const navigate = useNavigate();

  return (
    <ViewAllProducts
      title="Phones"
      products={phones}
      onBackClick={() => navigate('/phones')}
      dataTestIdPrefix="phones"
    />
  );
};

// wrapper para usar navigate em Tablets
const TabletsAllWrapper: React.FC = () => {
  const navigate = useNavigate();

  return (
    <ViewAllProducts
      title="Tablets"
      products={tablets}
      onBackClick={() => navigate('/tablets')}
      dataTestIdPrefix="tablets"
    />
  );
};

// wrapper para usar navigate em Accessories
const AccessoriesAllWrapper: React.FC = () => {
  const navigate = useNavigate();

  return (
    <ViewAllProducts
      title="Accessories"
      products={accessories}
      onBackClick={() => navigate('/accessories')}
      dataTestIdPrefix="accessories"
    />
  );
};

export const App: React.FC = () => (
  <ThemeProvider>
    <Router>
      <FavoritesProvider>
        <CartProvider>
          <ToastProvider>
            <div className={styles.app}>
              <Navbar />
              <main className={styles.content}>
                <h1>Product Catalog</h1>

                <Routes>
                  <Route path="/" element={<Home />} />

                  {/* Phones */}
                  <Route path="/phones" element={<Phones />} />
                  <Route path="/phones/all" element={<PhonesAllWrapper />} />

                  {/* Tablets */}
                  <Route path="/tablets" element={<Tablets />} />
                  <Route path="/tablets/all" element={<TabletsAllWrapper />} />

                  {/* Accessories */}
                  <Route path="/accessories" element={<Accessories />} />
                  <Route
                    path="/accessories/all"
                    element={<AccessoriesAllWrapper />}
                  />

                  {/* Outros */}
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route path="/cart" element={<ShoppingCart />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </ToastProvider>
        </CartProvider>
      </FavoritesProvider>
    </Router>
  </ThemeProvider>
);

export default App;
