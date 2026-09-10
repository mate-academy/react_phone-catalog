import { useEffect, useState } from 'react';
import { Product } from '../../../../types/Product';

type CartItem = {
  item: Product;
  quantity: number;
};

export const CartAmount = ({ setCheckoutActive }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const refreshCounts = () => {
    const carts = JSON.parse(localStorage.getItem('CartStore') || '[]');

    setCart(carts);
  };

  useEffect(() => {
    refreshCounts();
    window.addEventListener('quantity-update', refreshCounts);
    window.addEventListener('delete-update', refreshCounts);

    return () => {
      window.removeEventListener('quantity-update', refreshCounts);
      window.removeEventListener('delete-update', refreshCounts);
    };
  }, []);

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.quantity * item.item.price,
    0,
  );

  return (
    <div className="cart__amount-container">
      <p className="text-h2 cart__full-price">{`$${totalAmount}`}</p>
      <p className="text-body secondary">{`Total for ${totalQuantity} items`}</p>
      <div className="cart__line"></div>
      <div
        className="cart__button"
        onClick={() => {
          setCheckoutActive(true);
        }}
      >
        <p className="text-button">Checkout</p>
      </div>
    </div>
  );
};

export default CartAmount;
