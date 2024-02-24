import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './Cart.scss';
import { Button, ButtonBack } from '../../components/Button/Button';
import { usePhones } from '../../hooks/usePhones';
import { client } from '../../client/httpClient';
import { Product } from '../../types/Product';
import { CartList } from '../../components/CartList/CartList';
import { Loader } from '../../components/Loader/Loader';

export const Cart: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    cartProducts,
    setProducts,
    products,
    getProductCount,
  } = usePhones();

  useEffect(() => {
    setIsLoading(true);

    client.get<Product[]>('products.json')
      .then(setProducts)
      .finally(() => setIsLoading(false));
  }, [setProducts]);

  const preparedCartProducts = products.filter(({ itemId }) => {
    return cartProducts.some(({ id }) => id === itemId);
  });

  const totalPrice = preparedCartProducts.reduce((acc, product) => {
    return acc + (getProductCount(product.itemId) * product.price);
  }, 0);

  const totalCount = cartProducts.reduce((acc, product) => {
    return acc + product.count;
  }, 0);

  return (
    <section className="cart">
      {isLoading && <Loader />}

      {!isLoading && (
        <>
          <div className="cart__button-back">
            <ButtonBack />
          </div>

          {!preparedCartProducts.length && (
            <h1 className="content__title cart__title">
              No products in cart
            </h1>
          )}

          {!!preparedCartProducts.length && (
            <>
              <h1 className="content__title cart__title">
                Cart
              </h1>

              <div className="cart__wrapper">
                <CartList
                  cartItems={preparedCartProducts}
                />

                <div className="cart__order">
                  <h2 className="cart__order-price">
                    {`$${totalPrice}`}
                  </h2>

                  <p className="cart__order-count">
                    {`Total for ${totalCount} ${totalCount > 1 ? 'items' : 'item'}`}
                  </p>

                  <div className="cart__order-line" />

                  <Link
                    className="cart__order-btn-link"
                    to="/checkout"
                  >
                    <Button
                      className="
                        button
                        button__primary
                        button--large
                        button__cart-order
                      "
                    >
                      Checkout
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
};
