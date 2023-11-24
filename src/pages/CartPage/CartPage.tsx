/* eslint-disable react/jsx-one-expression-per-line */
import { useContext, useEffect, useState } from 'react';
import { BackLink } from '../../components/BackLink';
import { CartedProduct } from '../../components/CartContext';
import { NotImplemented } from '../../components/NotImplemented';
import { useAlert } from '../../helpers/fuctions/useAlert';
import { Product } from '../../helpers/types/Product';

export const CartPage = () => {
  const { cartedProducts, setCartedProducts } = useContext(CartedProduct);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isCheckout, setCheckout] = useAlert(false);

  const removeCartedProduct = (product: Product) => {
    const arr = cartedProducts.filter(
      (pr: Product) => pr.itemId !== product?.itemId,
    );

    window.localStorage.setItem(
      'cartedProducts', JSON.stringify(arr),
    );
    setCartedProducts(arr);
    setTotalPrice(val => val - product.price * product.count);
    setTotalAmount(val => val - product.count);
  };

  const changeAmount = (product: Product, operation: 'inc' | 'dec') => {
    const arr = cartedProducts.map((pr: Product) => {
      if (pr.itemId === product.itemId) {
        if (operation === 'inc') {
          return { ...product, count: product.count + 1 };
        }

        return { ...product, count: product.count - 1 };
      }

      return pr;
    });

    window.localStorage.setItem(
      'cartedProducts', JSON.stringify([...arr]),
    );
    setCartedProducts(arr);

    if (operation === 'inc') {
      setTotalPrice(val => val + product.price);
      setTotalAmount(val => val + 1);
    }

    if (operation === 'dec') {
      setTotalPrice(val => val - product.price);
      setTotalAmount(val => val - 1);
    }
  };

  useEffect(() => {
    if (cartedProducts.length > 0) {
      cartedProducts.forEach((pr: Product) => {
        setTotalPrice(val => val + pr.price * pr.count);
        setTotalAmount(val => val + pr.count);
      });
    }
  }, []);

  return (
    <section className="cart">
      <div className="cart__container _container">
        <BackLink />

        <h1 className="cart__title">
          Cart
        </h1>

        {cartedProducts.length === 0 ? (
          <p>Your cart is empty</p>
        )
          : (
            <div className="cart__contant">
              <ul className="cart__products-list">
                {cartedProducts.map((product: Product) => (
                  <li key={product.itemId} className="cart__product">
                    <button
                      aria-label="Mute volume"
                      type="button"
                      data-cy="cartDeleteButton"
                      className="cart__close icon-button icon-button--close"
                      onClick={() => removeCartedProduct(product)}
                    />

                    <div className="cart__img-container">
                      <img
                        className="cart__img"
                        src={product.image}
                        alt={product.name}
                      />
                    </div>

                    <p className="cart__product-title">
                      {product.name}
                    </p>

                    <div className="cart__counts_container">
                      <button
                        type="button"
                        className="
                          cart__button
                          icon-button"
                        onClick={() => changeAmount(product, 'dec')}
                        disabled={product.count === 1}
                      >
                        -
                      </button>

                      <p className="cart__count" data-cy="productQauntity">
                        {product.count}
                      </p>

                      <button
                        type="button"
                        className="
                          cart__button
                          icon-button"
                        onClick={() => changeAmount(product, 'inc')}
                      >
                        +
                      </button>
                    </div>
                    <p className="cart__price">${product.price}</p>
                  </li>
                ))}
              </ul>
              <div className="cart__checkout">
                <p className="cart__total-price">${totalPrice}</p>
                <p className="cart__total-items">
                  {'Total for '}
                  {totalAmount}
                  {' item'}{totalAmount > 1 ? 's' : ''}
                </p>
                <button
                  type="button"
                  className="
                    cart__button-checkout
                    icon-button"
                  onClick={setCheckout}
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
      </div>

      {isCheckout && <NotImplemented callback={setCheckout} />}
    </section>
  );
};
