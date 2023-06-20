import { useEffect, useState } from 'react';
import {
  Navigate, Route, Routes,
} from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Menu } from './components/Menu';
import { getProductsFromServer } from './helpers/fuctions/fetchProduct';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { Product } from './helpers/types/Product';
import { ProductsList } from './components/ProductsList';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartPage } from './pages/CartPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { CartProvider } from './components/CartContext';
import { Loader } from './components/Loader';
import { Error } from './components/Error';

const menuItems = [
  { to: '/', title: 'home' },
  { to: '/phones', title: 'phones' },
  { to: '/tablets', title: 'tablets' },
  { to: '/accessories', title: 'accessories' },
];

const App = () => {
  const [isActiveMenu, setActiveMenu] = useState(false);
  const [products, setProducts] = useState<Product[] | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  const toggleMenu = () => {
    setActiveMenu(!isActiveMenu);
  };

  async function getProducts() {
    setLoading(true);
    try {
      const productsFromServer = await getProductsFromServer();

      setProducts(productsFromServer);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (!isLoading && isError) {
    return (
      <Error />
    );
  }

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

          <Route path="/phones" element={<ProductsPage category="phones" />}>
            <Route
              index
              element={<ProductsList title="Mobile phones" category="phones" />}
            />
            <Route
              path=":selectedProductId"
              element={<ProductDetailsPage products={products} />}
            />
          </Route>

          <Route path="/tablets" element={<ProductsPage category="tablets" />}>
            <Route
              index
              element={<ProductsList title="Tablets" category="tablets" />}
            />
            <Route
              path=":selectedProductId"
              element={<ProductDetailsPage products={products} />}
            />
          </Route>

          <Route
            path="/accessories"
            element={<ProductsPage category="accessories" />}
          >
            <Route
              index
              element={
                <ProductsList title="Accessories" category="accessories" />
              }
            />
            <Route
              path=":selectedProductId"
              element={<ProductDetailsPage products={products} />}
            />
          </Route>

          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="*"
            element={
              // eslint-disable-next-line max-len
              <div className="App__not-found"><Error message="Page is not found" /></div>
            }
          />
        </Routes>
        <Footer />
      </div>
    </CartProvider>
  );
};

export default App;
