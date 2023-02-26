import classNames from 'classnames';
import { FC, useState } from 'react';
import { CartProduct } from '../types/CartProduct';
import { Product } from '../types/Product';
import { BackButton } from './BackButton';
import { Footer } from './Footer';
import { Header } from './Header';
import '../styles/cartPage.scss';

type Props = {
  products: Product[],
};

export const CartPage: FC<Props> = ({ products }) => {
  const [isAction, setIsAction] = useState(false);
  const currentCarts = JSON.parse(localStorage.getItem('carts') || '');

  const availableCarts = products.filter(product => (
    localStorage.getItem('carts')?.includes(product.id)
  ));

  const sumTotal
    = currentCarts.map((product: CartProduct) => product.price * product.count);

  const increaseCart = (productId: string) => {
    const item = currentCarts.find(
      (cartItem: CartProduct) => cartItem.id === productId,
    );

    let carts = [];

    if (localStorage.getItem('carts')) {
      carts = JSON.parse(localStorage.getItem('carts') || '');

      localStorage.setItem('carts', JSON.stringify([
        ...carts.filter((cartItem: CartProduct) => cartItem.id !== productId),
        {
          ...item,
          count: item.count + 1,
        },
      ]));
    }

    setIsAction(!isAction);
  };

  const decreaseCart = (productId: string) => {
    const item = currentCarts.find(
      (cartItem: CartProduct) => cartItem.id === productId,
    );

    let carts = [];

    if (localStorage.getItem('carts')) {
      carts = JSON.parse(localStorage.getItem('carts') || '');

      localStorage.setItem('carts', JSON.stringify([
        ...carts.filter((cartItem: CartProduct) => cartItem.id !== productId),
        {
          ...item,
          count: item.count - 1 || 1,
        },
      ]));
    }

    setIsAction(!isAction);
  };

  const removeCart = (productId: string) => {
    let cart = [];

    if (localStorage.getItem('carts')) {
      cart = JSON.parse(localStorage.getItem('carts') || '');

      localStorage.setItem('carts', JSON.stringify([
        ...cart.filter((cartItem: CartProduct) => cartItem.id !== productId),
      ]));

      setIsAction(!isAction);
    }
  };

  return (
    <>
      <Header />
      <main>
        <div className="cart container">
          <BackButton />
          <h2 className="cart__title">Cart</h2>
          {availableCarts.length > 0 && (
            <div className="cart__content">
              <div className="cart__items">
                {availableCarts.map(product => (
                  <div className="cart__item" key={product.id}>
                    <button
                      type="button"
                      data-cy="cartDeleteButton"
                      className="cart__item-delete-btn"
                      onClick={() => {
                        removeCart(product.id);
                      }}
                    >
                      x
                    </button>
                    <img
                      src={product.imageUrl}
                      alt="#"
                      className="cart__item-image"
                    />
                    <h2 className="cart__item-title">{product.name}</h2>
                    <div className="cart__item-counter">
                      <button
                        type="button"
                        className={classNames('cart__item-count-btn', {
                          'cart__item-count-btn--active': currentCarts.find(
                            (item: CartProduct) => item.id === product.id,
                          ).count > 1,
                        })}
                        onClick={() => {
                          decreaseCart(product.id);
                        }}
                      >
                        -
                      </button>
                      {currentCarts.find(
                        (item: CartProduct) => item.id === product.id,
                      ).count}
                      <button
                        type="button"
                        className="cart__item-count-btn
                         cart__item-count-btn--active"
                        onClick={() => {
                          increaseCart(product.id);
                        }}
                      >
                        +
                      </button>
                      <p className="cart__item-price">{`$${product.price - ((product.price / 100) * product.discount)}`}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cart__sum">
                <h2 className="cart__sum-amout" data-cy="productQauntity">
                  {`$${sumTotal.reduce((a: number, b: number) => a + b)}`}
                </h2>
                <p className="cart__sum-items">{`Total price for ${currentCarts.length} items`}</p>
                <button
                  className="cart__sum-button"
                  type="button"
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
          {!availableCarts.length && (
            <p>Products not found</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};
