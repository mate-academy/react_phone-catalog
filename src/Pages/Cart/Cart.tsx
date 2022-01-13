import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { BackButton } from '../../Components/BackButton/BackButton';
import { Footer } from '../../Components/Footer/Footer';
import { Header } from '../../Components/Header/Header';
import { CartItem } from '../../types/CartItem';
import { Product } from '../../types/Product';

import './Cart.scss';

type Props = {
  products: Product[],
};

export const Cart:React.FC<Props> = ({ products }) => {
  const [render, setRender] = useState(false);

  const visibleProducts = products.filter(product => (
    localStorage.getItem('carts')?.includes(product.id)
  ));

  const cart = JSON.parse(localStorage.getItem('carts') || '');

  const totalPrice = cart.map((product: CartItem) => product.price * product.count);

  useEffect(() => {

  }, [render]);

  return (
    <>
      <Header />
      <main>
        <div className="cart container">
          <BackButton />
          <h2 className="cart__title">Cart</h2>
          {!!visibleProducts.length && (
            <div className="cart__content">
              <div className="cart__items">
                {visibleProducts.map(product => (
                  <div className="cart__item" key={product.id}>
                    <button
                      type="button"
                      className="cart__item-delete-btn"
                      onClick={() => {
                        let carts = [];

                        if (localStorage.getItem('carts')) {
                          carts = JSON.parse(localStorage.getItem('carts') || '');
                        }

                        localStorage.setItem('carts', JSON.stringify([
                          ...carts.filter((p: CartItem) => p.id !== product.id),
                        ]));

                        setRender(!render);
                      }}
                    >
                      x
                    </button>
                    <img src={product.imageUrl} alt="#" className="cart__item-image" />
                    <h2 className="cart__item-title">{product.name}</h2>
                    <div className="cart__item-counter">
                      <button
                        type="button"
                        className={classNames('cart__item-count-btn', {
                          'cart__item-count-btn--active': cart.find((p: CartItem) => p.id === product.id).count > 1,
                        })}
                        onClick={() => {
                          const item = cart.find((p: CartItem) => p.id === product.id);
                          let carts = [];

                          if (localStorage.getItem('carts')) {
                            carts = JSON.parse(localStorage.getItem('carts') || '');
                          }

                          localStorage.setItem('carts', JSON.stringify([
                            ...carts.filter((p: CartItem) => p.id !== product.id),
                            {
                              ...item,
                              count: item.count - 1 || 1,
                            },
                          ]));

                          setRender(!render);
                        }}
                      >
                        -
                      </button>
                      {cart.find((p: CartItem) => p.id === product.id).count}
                      <button
                        type="button"
                        className="cart__item-count-btn cart__item-count-btn--active"
                        onClick={() => {
                          const item = cart.find((p: CartItem) => p.id === product.id);
                          let carts = [];

                          if (localStorage.getItem('carts')) {
                            carts = JSON.parse(localStorage.getItem('carts') || '');
                          }

                          localStorage.setItem('carts', JSON.stringify([
                            ...carts.filter((p: CartItem) => p.id !== product.id),
                            {
                              ...item,
                              count: item.count + 1,
                            },
                          ]));

                          setRender(!render);
                        }}
                      >
                        +
                      </button>
                      <p className="cart__item-price">{`$${product.newPrice}`}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cart__sum">
                <h2 className="cart__sum-amout">{`$${totalPrice.reduce((a: number, b: number) => a + b)}`}</h2>
                <p className="cart__sum-items">{`Total for ${cart.length} items`}</p>
                <button className="cart__sum-button" type="button">Checkout</button>
              </div>
            </div>
          )}
          {!visibleProducts.length && (
            <p>Your cart is emty</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};
