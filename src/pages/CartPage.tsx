import React, { useContext } from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import '../helpers/page.scss';
import '../helpers/grid.scss';
import { Total } from '../components/Total';
import { ProductsContext } from '../helpers/ProductsContext';
import { CartItemInfo } from '../types/CartItemInfo';
import { CartItem } from '../components/CartItem';

export const CartPage: React.FC = () => {
  const { cartItems } = useContext(ProductsContext);

  return (
    <div className="page">
      <Header isCartPageOpen />

      <div className="page__content">
        <h1 className="page__title page__title--margin">
          Cart
        </h1>

        {cartItems.length > 0
          ? (
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
          ) : (
            <p>Your cart is empty</p>
          )}
      </div>

      <Footer />
    </div>
  );
};
