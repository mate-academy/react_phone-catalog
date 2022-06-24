import { useEffect, useState } from 'react';

import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Back } from '../../components/Back';

import './CartPage.scss';

const cart = () => {
  let keys = Object.keys(localStorage);

  keys = keys.filter((key) => key.includes('cart') === true);

  const itemsFromStorage = keys.map((key) => {
    const productKey = localStorage.getItem(key);

    if (productKey) {
      return JSON.parse(productKey);
    }

    return null;
  });

  return itemsFromStorage;
};

export const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const totalPrice = cartItems.reduce(
    (sum, current) => sum + (current.quantity
      * (current.product.price
      - current.product.price * (current.product.discount / 100))), 0,
  );
  const totalCount = cartItems.reduce(
    (sum, current) => sum + current.quantity, 0,
  );

  useEffect(() => {
    setCartItems(cart);
  }, []);

  const handeleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    localStorage.removeItem(`cart-${event.currentTarget.value}`);
    setCartItems(cart());
  };

  const handeleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const oldCart = [...cartItems];
    const currentProduct = oldCart.find(
      (item) => item.id === +event.currentTarget.value,
    );

    if (currentProduct && event.currentTarget.name === 'plus') {
      currentProduct.quantity += 1;
      localStorage.setItem(`cart-${currentProduct.product.id}`, JSON.stringify({
        id: currentProduct.product.age,
        quantity: currentProduct.quantity,
        product: currentProduct.product,
      }));
    } else if (currentProduct && event.currentTarget.name === 'minus') {
      currentProduct.quantity -= 1;
      localStorage.setItem(`cart-${currentProduct.product.id}`, JSON.stringify({
        id: currentProduct.product.age,
        quantity: currentProduct.quantity,
        product: currentProduct.product,
      }));
    }

    setCartItems(oldCart);
  };

  return (
    <>
      <div className="content">
        <Header />
        <div className="wrapper">
          <div className="CartPage">
            <Back />
            <h1 className="CartPage__title">Cart</h1>
            <div className="CartPage__info">
              <div className="CartPage__products">
                {cartItems && (
                  cartItems.map((product) => {
                    const {
                      name, discount, price, imageUrl, id,
                    } = product.product;

                    return (
                      <div className="CartPage__card" key={id}>
                        <div className="CartPage__product">
                          <button
                            type="button"
                            value={id}
                            onClick={handeleDelete}
                            className="CartPage__cross"
                          >
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 10 10"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M9.47157 1.4714C9.73192 1.21105 9.73192
                            0.78894 9.47157 0.52859C9.21122 0.268241
                            8.78911 0.268241 8.52876 0.52859L5.00016
                            4.05719L1.47157 0.52859C1.21122 0.268241
                            0.789108 0.268241 0.528758 0.52859C0.268409
                            0.78894 0.268409 1.21105 0.528758 1.4714L4.05735
                            4.99999L0.528758 8.52859C0.268409 8.78894 0.268409
                            9.21105 0.528758 9.4714C0.789108 9.73175 1.21122
                            9.73175 1.47157 9.4714L5.00016 5.9428L8.52876
                            9.4714C8.78911 9.73175 9.21122 9.73175 9.47157
                            9.4714C9.73192 9.21105 9.73192 8.78894 9.47157
                            8.52859L5.94297 4.99999L9.47157 1.4714Z"
                              />
                            </svg>
                          </button>
                          <img src={`${imageUrl}`} alt={name} className="CartPage__product-img" />
                          <p className="CartPage__product-text">
                            {name}
                          </p>
                        </div>

                        <div className="CartPage__actions">
                          <button
                            type="button"
                            value={product.id}
                            onClick={handeleClick}
                            name="minus"
                            className="button CartPage__minus"
                            disabled={product.quantity <= 1}
                          >
                            <svg
                              width="12"
                              height="2"
                              viewBox="0 0 12 2"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0.666504 0.999995C0.666504 0.631805 0.964981
                                0.333328 1.33317 0.333328H10.6665C11.0347
                                0.333328 11.3332 0.631805 11.3332
                                0.999995C11.3332 1.36818
                                11.0347 1.66666 10.6665 1.66666H1.33317C0.964981
                                1.66666 0.666504 1.36818 0.666504 0.999995Z"
                              />
                            </svg>
                          </button>
                          <p className="CartPage__quantity">
                            {product.quantity}
                          </p>
                          <button
                            onClick={handeleClick}
                            value={product.id}
                            name="plus"
                            type="button"
                            className="button CartPage__plus"
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M6.6665 1.33334C6.6665 0.965149 6.36803
                              0.666672 5.99984 0.666672C5.63165 0.666672
                              5.33317 0.965149 5.33317
                              1.33334V5.33334H1.33317C0.964981 5.33334
                              0.666504 5.63182 0.666504 6.00001C0.666504
                              6.3682 0.964981 6.66667 1.33317
                              6.66667H5.33317V10.6667C5.33317
                              11.0349 5.63165 11.3333 5.99984
                              11.3333C6.36803 11.3333 6.6665 11.0349
                              6.6665 10.6667V6.66667H10.6665C11.0347
                              6.66667 11.3332 6.3682 11.3332
                              6.00001C11.3332 5.63182 11.0347 5.33334
                              10.6665 5.33334H6.6665V1.33334Z"
                              />
                            </svg>
                          </button>
                          {product.product.discount === 0 ? (
                            <h2 className="CartPage__price">{`$${product.quantity * price}`}</h2>
                          ) : (
                            <h2 className="CartPage__price">{`$${product.quantity * (price - price * (discount / 100))}`}</h2>
                          )}
                        </div>

                      </div>
                    );
                  })
                )}
              </div>

              <div className="CartPage__total">
                <h1 className="CartPage__total-title">{`$${totalPrice}`}</h1>
                {totalCount !== 1 ? (
                  <p className="CartPage__total-text">
                    {`Total for ${totalCount} items`}
                  </p>
                ) : (
                  <p className="CartPage__total-text">
                    {`Total for ${totalCount} item`}
                  </p>
                )}
                <button
                  type="button"
                  className="main-button CartPage__button"
                  onClick={() => {
                  // eslint-disable-next-line no-alert
                    window.alert('functionality is not implemented yet');
                  }}
                >
                  Checkout
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
