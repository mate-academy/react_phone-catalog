import React, {
  FC,
  useContext,
  useCallback,
  useState,
  useEffect,
} from 'react';
import { CartStorageContext } from '../../Context/CartStorageContext';
import { BackButton } from '../../components/BackButton';
import { CartTotal } from '../../components/CartTotal';
import { CartList } from '../../components/CartList';
import { CartProduct } from '../../types/CartProduct';

import './CartPage.scss';

export const CartPage: FC = () => {
  const {
    cartItems,
    setCartItems,
    getTotalPrice,
    getTotalCartItems,
  } = useContext(CartStorageContext);

  const [currentCartItems, setCurrentCartItems] =
    useState<CartProduct[]>(cartItems);

  const handleIncreaseQuantity = useCallback((itemId: string) => {
    setCurrentCartItems((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }, []);

  const handleDecreaseQuantity = useCallback((itemId: string) => {
    setCurrentCartItems((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  }, []);

  const handleRemoveFromCart = useCallback((itemId: string) => {
    setCurrentCartItems((prevCart) =>
      prevCart.filter((item) => item.id !== itemId)
    );
  }, []);

  useEffect(() => {
    if (setCartItems) {
      setCartItems(currentCartItems);
    }
  }, [currentCartItems]);

  return (
    <div
      className='
      main__cart-page
      main__cart-page--width
      products-page
      cart
      '
    >
      <BackButton />

      {!cartItems.length ? (
        <h3>Your cart is empty.</h3>
      ) : (
        <div className='cart__info-container'>
          <div className='cart__items-container'>
            <CartList
              cartItems={cartItems}
              onIncreaseQuantity={handleIncreaseQuantity}
              onDecreaseQuantity={handleDecreaseQuantity}
              onRemoveFromCart={handleRemoveFromCart}
            />
          </div>

          <CartTotal
            totalPrice={getTotalPrice()}
            totalItems={getTotalCartItems && getTotalCartItems()}
          />
        </div>
      )}
    </div>
  );
};
