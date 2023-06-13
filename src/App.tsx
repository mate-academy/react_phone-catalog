import { useEffect, useState } from 'react';
import {
  Navigate, Route, Routes,
} from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Menu } from './components/Menu';
import { getProductsFromServer } from './helpers/fuctions/fetchProduct';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { Product } from './helpers/types/Product';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { PhonesCatalog } from './components/PhonesCatalog';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartPage } from './pages/CartPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { CartProvider } from './components/CartContext';

const menuItems = [
  { to: '/', title: 'home' },
  { to: '/phones', title: 'phones' },
  { to: '/tablets', title: 'tablets' },
  { to: '/accessories', title: 'accessories' },
];

const App = () => {
  const [isActiveMenu, setActiveMenu] = useState(false);
  const [products, setProducts] = useState<Product[] | null>(null);

  const toggleMenu = () => {
    setActiveMenu(!isActiveMenu);
  };

  async function getProducts() {
    const productsFromServer = await getProductsFromServer();

    setProducts(productsFromServer);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <CartProvider>
      <div className="App">
        <Header menuItems={menuItems} toggleMenu={toggleMenu} />
        <Menu
          menuItems={menuItems}
          isActiveMenu={isActiveMenu}
          toggleMenu={toggleMenu}
        />
        <Routes>
          <Route path="/" element={<HomePage products={products} />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/phones" element={<PhonesPage />}>
            <Route index element={<PhonesCatalog />} />
            <Route
              path=":selectedProductId"
              element={<ProductDetailsPage products={products} />}
            />
          </Route>
          <Route path="/tablets" element={<TabletsPage />} />
          <Route path="/accessories" element={<AccessoriesPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
        <Footer />
      </div>
    </CartProvider>
  );
};

export default App;
