import { Route, Routes } from 'react-router-dom';
import { App } from './App';
import MobilePhones from './components/MobilePhones';
import Favourites from './components/Favourites';
import Cart from './components/Cart/Cart';
import { useCart } from './context/CartContext';
import Footer from './components/Footer';

export const Root = () => {
  const { lovelyProducts } = useCart();

  console.log(lovelyProducts);

  return (
    <>
      <Routes>
        <Route path="/" element={<App />} />

        <Route path="/phones" element={<MobilePhones gadgets={'phones'} />} />
        <Route path="/tablets" element={<MobilePhones gadgets={'tablets'} />} />
        <Route
          path="/accessories"
          element={<MobilePhones gadgets={'accessories'} />}
        />
        <Route
          path="/favorites"
          element={<Favourites product={lovelyProducts} />}
        />

        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
};
