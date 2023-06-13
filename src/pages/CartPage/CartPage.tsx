/* eslint-disable react/jsx-one-expression-per-line */
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartedProduct } from '../../components/CartContext';
import { Product } from '../../helpers/types/Product';

export const CartPage = () => {
  const { cartedProducts, setCartedProducts } = useContext(CartedProduct);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

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

  // eslint-disable-next-line consistent-return
  const increase = (product: Product) => {
    const arr = cartedProducts.map((pr: Product) => {
      if (pr.itemId === product.itemId) {
        return { ...product, count: product.count + 1 };
      }

      return pr;
    });

    window.localStorage.setItem(
      'cartedProducts', JSON.stringify([...arr]),
    );
    setCartedProducts(arr);
    setTotalPrice(val => val + product.price);
    setTotalAmount(val => val + 1);
  };

  const decrease = (product: Product) => {
    const arr = cartedProducts.map((pr: Product) => {
      if (pr.itemId === product.itemId) {
        return { ...product, count: product.count - 1 };
      }

      return pr;
    });

    window.localStorage.setItem(
      'cartedProducts', JSON.stringify([...arr]),
    );
    setCartedProducts(arr);
    setTotalPrice(val => val - product.price);
    setTotalAmount(val => val - 1);
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
        <Link to="/phones" className="cart__back">
          Back
        </Link>

        <h2 className="cart__title">
          Cart
        </h2>

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
                      className="cart__close icon-button"
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
                        onClick={() => decrease(product)}
                        disabled={product.count === 1}
                      >
                        -
                      </button>

                      <p className="cart__count">
                        {product.count}
                      </p>

                      <button
                        type="button"
                        className="
                          cart__button
                          icon-button"
                        onClick={() => increase(product)}
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
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
      </div>
    </section>
  );
};
