import { useContext, useEffect, useState } from 'react';
import { ProductCard } from '../../../shared/components/ProductCard';
import { CartContext } from '../../../../context/AppContext';
import { CartItem } from '../../../../types/CartItem';
import './CartPage.scss';

export const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const {
    cartProducts,
    incrementProductInCart,
    decrementProductInCart,
    removeFromCart,
  } = useContext(CartContext);

  useEffect(() => {
    const products: CartItem[] = [];

    for (const key in cartProducts) {
      products.push({
        product: cartProducts[key].product,
        quantity: cartProducts[key].quantity,
      });
    }

    setCartItems(products);
  }, [cartProducts]);

  return (
    !!cartItems.length && (
      <div>
        <h1>CartPage</h1>
        <div>
          {cartItems.map((item: CartItem) => {
            return (
              <div style={{ display: 'flex' }} key={item.product.id}>
                <ProductCard product={item.product} />

                <button onClick={() => decrementProductInCart(item.product)}>
                  -
                </button>
                <p>Amount: {item.quantity}</p>
                <button onClick={() => incrementProductInCart(item.product)}>
                  +
                </button>

                <button onClick={() => removeFromCart(item.product)}>X</button>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
};
