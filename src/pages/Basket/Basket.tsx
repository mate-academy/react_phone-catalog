import React, { useState, useEffect } from 'react';
import { Back } from '../../components/Back/Back';
import { Product, CartItem } from '../../type';
import { BasketItem } from '../../helpers/BasketItem/BasketItem';
import '../../container.scss';
import './Basket.scss';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';

type Props = {
  products: Product[]
};

export const Basket: React.FC<Props> = ({ products }) => {
  const [render, setRender] = useState(false);
  const visibleProducts = products
    .filter(product => localStorage.getItem('carts')?.includes(product.id));
  const cart = JSON.parse(localStorage.getItem('carts') || '');
  const totalPrice = cart
    .map((product: CartItem) => product.price * product.count);

  useEffect(() => {}, [render]);

  return (
    <div className="wrapper">
      <Header />
      <main className="basket">
        <div className="container">
          <Back />
          <h1 className="basket__title h1">Cart</h1>
          {visibleProducts.length !== 0 ? (
            <div className="basket__wrapper">
              <div className="basket__list">
                {visibleProducts.map(product => (
                  <div className="basket__item" key={product.id}>
                    <BasketItem
                      product={product}
                      renderFunc={() => setRender(prev => !prev)}
                    />
                  </div>
                ))}
              </div>
              <div className="basket__checkout">
                <div className="basket__checkout--price">
                  {`$${totalPrice.reduce((a: number, b: number) => a + b)}`}
                </div>
                <div className="basket__text bodytext">
                  Total for
                  {visibleProducts.length}
                  {' '}
                  items
                </div>
                <div className="basket__line" />
                <button type="button" className="basket__button button">
                  Checkout
                </button>
              </div>
            </div>
          ) : (
            <div className="basket__not h2">Not found</div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};
