import React, { useEffect, useState } from 'react';
import './CartPage.scss';
import { ButtonBack } from '../../components/ButtonBack';
import { CartList } from '../../components/CartList';
import { Checkout } from '../../components/Checkout';
import { getLocalStorage } from '../../helpers/utils/getLocalStorage';
import { CartObjType } from '../../helpers/types/CartObjType';

type Props = {};

const KEY = 'cart';

export const CartPage: React.FC<Props> = () => {
  const [productsInCart, setProductsInCart] = useState<CartObjType>();

  let totalPrice = 0;
  let totalQuantity = 0;

  if (productsInCart) {
    Object.values(productsInCart).forEach(prod => {
      totalPrice += prod.price * prod.quantity;
      totalQuantity += prod.quantity;
    });
  }

  const getCartProducts = () => {
    const storage = getLocalStorage<CartObjType>(KEY);

    if (storage) {
      setProductsInCart(storage);
    }
  };

  useEffect(() => {
    window.addEventListener('storage', getCartProducts);

    getCartProducts();

    return () => window.removeEventListener('storage', getCartProducts);
  }, []);

  return (
    <main className="cart-page">
      <div className="container">
        <div className="cart-page__content">
          <section className="cart-page__head">
            <ButtonBack />
            <h1 className="cart-page__title">Cart</h1>
          </section>
          <section className="cart-page__main">
            <div className="cart-page__cart-list">
              {productsInCart && <CartList productsInCart={productsInCart} />}
            </div>

            <div className="cart-page__checkout">
              <Checkout totalPrice={totalPrice} totalQuantity={totalQuantity} />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};
