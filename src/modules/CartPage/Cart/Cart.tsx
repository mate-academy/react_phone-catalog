import { useLocalStorage } from '../../../app/hooks';
import { Product } from '../../../types/Product';

export const Cart = () => {
  const [cart, setCart] = useLocalStorage<Product[]>('cart', []);

  console.log('cart:', cart);

  return (
    <div className="cart">
      <h1>Cart</h1>
      <p>Your cart is empty.</p>
    </div>
  );
};
