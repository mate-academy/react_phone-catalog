import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { Product } from './types/Product';
import { getProductsFromServer } from './helpers/fetchProducts';
import { Loader } from './components/Loader';
import { Error } from './components/Error';
import { Footer } from './components/Footer';
import { ProductsPage } from './pages/ProductsPage';
import { ProductsList } from './components/ProductsList';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { CartPage } from './pages/CartPage';
import { Menu } from './components/Menu';
import { CartProvider } from './components/CartContext';

const menuItems = [
  { to: '/', title: 'Home' },
  { to: '/phones', title: 'Phones' },
  { to: '/tablets', title: 'Tablets' },
  { to: '/accessories', title: 'Accessories' },
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
