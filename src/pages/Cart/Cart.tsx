import React, {
  useMemo,
  useContext,
  useCallback,
} from 'react';
import { BackButton } from '../../components/BackButton/BackButton';

import { CartItems } from '../../components/CartItems/CartItems';
import {
  CartTotalAmount,
} from '../../components/CartTotalAmount/CartTotalAmount';

import { CartContext } from '../../helpers/CartProvider';
import { CardItem } from '../../types/CardItem';
import { Product } from '../../types/Product';
import { useLocalStorage } from '../../utils/useLocalStorage';

import './Cart.scss';

export const Cart: React.FC = () => {
  const [products] = useLocalStorage<Product[]>('products', []);
  const { cart, setCart } = useContext(CartContext);

  const visibleProducts = useMemo(() => {
    return products.filter(product => cart.some((value: CardItem) => {
      return value.id === product.id;
    }));
  }, [cart]);

  const deleteCart = (product: Product) => {
    setCart(prev => [
      ...prev.filter((p: CardItem) => p.id !== product.id),
    ]);
  };

  const increaseCountCart = useCallback((product: Product) => {
    setCart(prevCart => prevCart.map(carts => {
      if (carts.id === product.id) {
        return {
          ...carts,
          count: carts.count + 1,
        };
      }

      return carts;
    }));
  }, [cart]);

  const decreaseCountCart = useCallback((product: Product) => {
    setCart(prevCart => prevCart.map(carts => {
      if (carts.id === product.id) {
        return {
          ...carts,
          count: carts.count - 1 || 1,
        };
      }

      return carts;
    }));
  }, [cart]);

  return (
    <main>
      <div className="cart container">
        <BackButton />
        <h2 className="cart__title">Cart</h2>
        {!!visibleProducts.length && (
          <div className="cart__content">
            <CartItems
              products={visibleProducts}
              cart={cart}
              deleteCart={deleteCart}
              decreaseCountCart={decreaseCountCart}
              increaseCountCart={increaseCountCart}
            />

            <CartTotalAmount cart={cart} />
          </div>
        )}
        {!visibleProducts.length && (
          <p>Your cart is emty</p>
        )}
      </div>
    </main>
  );
};
