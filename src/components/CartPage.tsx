import { FC, useEffect, useState } from 'react';
import { CartProduct } from '../types/CartProduct';
import { BackButton } from './BackButton';
import { Footer } from './Footer';
import { Header } from './Header';
import '../styles/cartPage.scss';
import { CartItem } from './CartItem';

export const CartPage: FC = () => {
  const [cart, setCart] = useState<CartProduct[]>([]);

  useEffect(() => {
    const storageValue: string | null = localStorage.getItem('cart');
    const parsedStorage: CartProduct[] | [] = storageValue
      ? JSON.parse(storageValue)
      : [];

    setCart(parsedStorage);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const totalCount = () => {
    return cart.reduce((prev, current) => (
      prev + +current.count
    ), 0);
  };

  const totalPrice = () => {
    return cart.reduce((prev, current) => (
      prev + (current.item.price * +current.count)
    ), 0);
  };

  const updateCount = (id: string, itemCount: number) => {
    setCart(cart.map((cartItem: CartProduct) => {
      if (id === cartItem.item.id) {
        return ({
          ...cartItem,
          count: itemCount,
        });
      }

      return cartItem;
    }));
  };

  const deleteItem = (id: string) => {
    setCart(cart.filter((cartItem) => cartItem.item.id !== id));
  };

  return (
    <>
      <Header />
      <main>
        <div className="cart container">
          <BackButton />
          <h2 className="cart__title">Cart</h2>
          {cart.length > 0 && (
            <div className="cart__content">
              <div className="cart__items">
                {cart.map(cartItem => (
                  <CartItem
                    key={cartItem.item.id}
                    cartItem={cartItem}
                    updateCount={updateCount}
                    deleteItem={deleteItem}
                  />
                ))}
              </div>
              <div className="cart__sum">
                <h2 className="cart__sum-amout" data-cy="productQauntity">
                  {`$${totalPrice()}`}
                </h2>
                <p className="cart__sum-items">{`Total price for ${totalCount()} items`}</p>
                <button
                  className="cart__sum-button"
                  type="button"
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
          {!cart.length && (
            <p>Products not found</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};
