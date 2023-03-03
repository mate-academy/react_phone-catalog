import React, { useContext } from 'react';
import '../helpers/grid.scss';
import './page.scss';
import { ProductsContext } from '../helpers/ProductsContext';

import { Header } from '../components/Header/Header';
import { Total } from '../components/Total/Total';
import { CartItemInfo } from '../types/CartItemInfo';
import { CartItem } from '../components/CartItem/CartItem';
import { Footer } from '../components/Footer/Footer';

export const CartPage: React.FC = () => {
  const { cartItems } = useContext(ProductsContext);

  return (
    <div className="page">
      <Header isCartPageOpen />

      <div className="page__content">
        <h1 className="page__title page__title--margin-24">
          Cart
        </h1>

        {cartItems.length > 0
          ? (
            <section className="page__section">
              <div className="grid">
                <div className="grid__item grid__item--1-16">
                  {cartItems.map((product: CartItemInfo) => (
                    <CartItem
                      key={product.id}
                      cartItem={product}
                    />
                  ))}
                </div>

                <div className="grid__item grid__item--17-24">
                  <Total />
                </div>
              </div>
            </section>
          ) : (
            <p>Your cart is empty</p>
          )}
      </div>

      <Footer />
    </div>
  );
};
