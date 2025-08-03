import { Route, Routes } from 'react-router-dom';
import { App } from './App';
import MobilePhones from './components/MobilePhones';
import Favourites from './components/Favourites';
import Cart from './components/Cart/Cart';
import { useCart } from './context/CartContext';
import Footer from './components/Footer';
import ProductDetailsPage from './components/ProductDetailsPage';

export const Root = () => {
  const { lovelyProducts } = useCart();

  console.log(lovelyProducts);

  return (
    <>
      <Routes>
        <Route path="/" element={<App />} />

        <Route path="/phones" element={<MobilePhones />} />
        <Route path="/tablets" element={<MobilePhones />} />
        <Route path="/accessories" element={<MobilePhones />} />

        <Route
          path="/favorites"
          element={<Favourites product={lovelyProducts} />}
        />
        <Route path="/cart" element={<Cart />} />

        <Route path="/phones/:productId" element={<ProductDetailsPage />} />
        <Route path="/tablets/:productId" element={<ProductDetailsPage />} />
        <Route
          path="/accessories/:productId"
          element={<ProductDetailsPage />}
        />
      </Routes>
    </>
  );
};
