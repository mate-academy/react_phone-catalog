import classNames from 'classnames';
import React, { useState, useMemo, useContext } from 'react';
import { BackButton } from '../../components/BackButton/BackButton';
import { CartContext } from '../../helpers/CartProvider';
import { CardItem } from '../../types/CardItem';
import { Product } from '../../types/Product';
import { useLocalStorage } from '../../utils/useLocalStorage';

import './Cart.scss';

export const CardsPage: React.FC = () => {
  const [products] = useLocalStorage<Product[]>('products', []);
  const { setCart } = useContext(CartContext);
  const [cards, setCards] = useLocalStorage<CardItem[]>('carts', []);
  const [render, setRender] = useState(false);

  const visibleProducts = useMemo(() => {
    return products.filter(product => cards.some((value: CardItem) => {
      return value.id === product.id;
    }));
  }, [cards]);

  const cart = JSON.parse(localStorage.getItem('carts') || '');

  const deleteCart = (product: Product) => {
    let carts = [];

    if (localStorage.getItem('carts')) {
      carts = JSON.parse(localStorage.getItem('carts') || '');
    }

    setCards([
      ...carts.filter((p: CardItem) => p.id !== product.id),
    ]);

    setRender(!render);
  };

  const increaseCountCart = (product: Product) => {
    const item = cart.find((p: CardItem) => p.id === product.id);
    let carts = [];

    if (localStorage.getItem('carts')) {
      carts = JSON.parse(localStorage.getItem('carts') || '');
    }

    setCart([
      ...carts.filter((p: CardItem) => p.id !== product.id),
      {
        ...item,
        count: item.count + 1,
      },
    ]);

    setRender(!render);
  };

  const decreaseCountCart = (product: Product) => {
    const item = cart.find((p: CardItem) => p.id === product.id);
    let carts = [];

    if (localStorage.getItem('carts')) {
      carts = JSON.parse(localStorage.getItem('carts') || '');
    }

    localStorage.setItem('carts', JSON.stringify([
      ...carts.filter((p: CardItem) => p.id !== product.id),
      {
        ...item,
        count: item.count - 1 || 1,
      },
    ]));

    setRender(!render);
  };

  const totalPrice = cart.map((product: CardItem) => {
    return product.price * product.count;
  });

  return (
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
                    onClick={() => deleteCart(product)}
                  >
                    x
                  </button>

                  <img src={`../_new/${product.image}`} alt="#" className="cart__item-image" />
                  <h2 className="cart__item-title">{product.name}</h2>
                  <div className="cart__item-counter">
                    <button
                      type="button"
                      className={classNames(
                        'cart__item-count-btn',
                        {
                          'cart__item-count-btn--active':
                            cart.find((p: CardItem) => p.id === product.id),
                        },
                      )}
                      onClick={() => decreaseCountCart(product)}
                    >
                      -
                    </button>

                    {cart.find((p: CardItem) => p.id === product.id).count}
                    <button
                      type="button"
                      className="
                        cart__item-count-btn
                        cart__item-count-btn--active
                      "
                      onClick={() => increaseCountCart(product)}
                    >
                      +
                    </button>
                    <p className="cart__item-price">{`$${product.price}`}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart__sum">
              <h2 className="cart__sum-amout">{`$${totalPrice.reduce((a: number, b: number) => a + b)}`}</h2>
              <p className="cart__sum-items">{`Total for ${cart.length} items`}</p>
              <button
                className="cart__sum-button"
                type="button"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
        {!visibleProducts.length && (
          <p>Your cart is emty</p>
        )}
      </div>
    </main>
  );
};
