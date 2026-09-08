import { Route, Routes } from 'react-router-dom';
import { useCallback, useState } from 'react';
import './App.scss';
import { HomePage } from './modules/HomePage';
import { ProductsPage } from './modules/PhonesPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { CartPage } from './modules/CartPage';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Footer } from './components/Footer/Footer';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { useCart } from './modules/CartPage/components/CartContext/CartContext';
import { Product } from './types/Product';

export const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [productsIsLoading, setProductsIsLoading] = useState(false);
  const [productsIsError, setProductsIsError] = useState(false);

  const fetchData = useCallback(() => {
    setProductsIsLoading(true);
    setProductsIsError(false);

    fetch('./api/products.json')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
      })
      .catch(() => {
        setProductsIsError(true);
      })
      .finally(() => {
        setProductsIsLoading(false);
      });
  }, []);

  return (
    <div className={`app ${isSidebarOpen ? 'no-scroll' : ''}`}>
      <Header onMenuClick={toggleSidebar} isOpen={isSidebarOpen} cart={cart} />
      <div className="app__body">
        <Sidebar isOpen={isSidebarOpen} />
        <div className="app__content">
          <main className="main">
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="/" element={<HomePage />} />
              <Route
                path="/phones"
                element={
                  <ProductsPage
                    title="Mobile phones"
                    sortBy="phones"
                    products={products}
                    isLoading={productsIsLoading}
                    isError={productsIsError}
                    fetchData={fetchData}
                  />
                }
              />
              <Route
                path="/tablets"
                element={
                  <ProductsPage
                    title="Tablets"
                    sortBy="tablets"
                    products={products}
                    isLoading={productsIsLoading}
                    isError={productsIsError}
                    fetchData={fetchData}
                  />
                }
              />
              <Route
                path="/accessories"
                element={
                  <ProductsPage
                    title="Accessories"
                    sortBy="accessories"
                    products={products}
                    isLoading={productsIsLoading}
                    isError={productsIsError}
                    fetchData={fetchData}
                  />
                }
              />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route
                path="/cart"
                element={
                  <CartPage
                    cart={cart}
                    removeFromCart={removeFromCart}
                    increaseQuantity={increaseQuantity}
                    decreaseQuantity={decreaseQuantity}
                  />
                }
              />
              <Route
                path="/:category/:productId"
                element={
                  <ProductDetailsPage
                    products={products}
                    fetchDataProducts={fetchData}
                  />
                }
              />
            </Routes>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};
