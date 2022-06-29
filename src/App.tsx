import { HashRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.scss';
import Footer from './pages/Footer';
import Header from './pages/Header';
import HomePage from './pages/HomePage';
import ProductDetails from './pages/ProductDetails';
import CartProvider from './context/CartProvider';
import PhonesPage from './pages/PhonesPage';
import TabletsPage from './pages/TabletsPage';
import CartPage from './pages/CartPage';
import FavoritesProvider from './context/FavoritesProvider';
import Favorites from './pages/Favorites';
import { getProducts } from './api/getProducts';
import { Product } from './types/Product';

const App = () => {
  const [productList, setProductList] = useState<Product[] | []>([]);
  const phonesList = productList.filter(product => product.type === 'phone');
  const tabletsList = productList.filter(product => product.type === 'tablet');
  const accessoriesList = productList.filter(product => (
    product.type === 'accessorie'));

  const fetchData = async () => {
    const res = await getProducts();

    setProductList(res.map((item: Product) => ({
      ...item,
      newPrice: (item.price - ((item.discount * item.price) / 100)).toFixed(0),

    })));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <HashRouter>
      <CartProvider>
        <FavoritesProvider>
          <Header />
          <main className="page__main container">
            <Routes>
              <Route path="/" element={<HomePage list={productList} />} />
              <Route
                path="/phones"
                element={<PhonesPage list={phonesList} />}
              />
              <Route
                path="/phones/:phoneId"
                element={<ProductDetails list={productList} />}
              />
              <Route
                path="/tablets"
                element={<TabletsPage list={tabletsList} />}
              />
              <Route
                path="/tablets/:tabletId"
                element={<ProductDetails list={productList} />}
              />
              <Route
                path="/accessories"
                element={<TabletsPage list={accessoriesList} />}
              />
              <Route
                path="/accessories/:accessorieId"
                element={<ProductDetails list={productList} />}
              />
              <Route path="/cartPage" element={<CartPage />} />
              <Route
                path="/favorites"
                element={<Favorites list={productList} />}
              />
            </Routes>
          </main>
          <Footer />
        </FavoritesProvider>
      </CartProvider>
    </HashRouter>
  );
};

export default App;
