import {
  useState,
  useEffect,
  useContext,
} from 'react';
import { useLocation } from 'react-router-dom';
import { NoResults } from '../components/additional/NoResults';
import { Product } from '../types/Product';
import { Loader } from '../components/additional/Loader';
import { CartProducts } from '../components/context/SavedProductsContext';
import { CartList } from '../components/Cart/CartList';
import { Checkout } from '../components/Cart/Checkout';
import { BackButton } from '../components/additional/BackButton';

export const CartPage = () => {
  const { cartProducts } = useContext(CartProducts);
  const location = useLocation();
  const [cart, setCart] = useState<Product[]>([]);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    setCart(cartProducts);
    setIsLoad(false);
  }, [cartProducts]);

  return (
    <main className="main">
      <div className="page-heading">
        <BackButton />
        <h1>Cart</h1>
      </div>

      {isLoad && (<Loader />)}

      {!isLoad && cart.length > 0 && (
        <section className="cart">
          <CartList products={cart} />
          <Checkout />
        </section>
      )}

      {!isLoad && cart.length === 0 && (
        <NoResults text={`Your ${location.pathname.slice(1)} is empty`} />)}

    </main>
  );
};
