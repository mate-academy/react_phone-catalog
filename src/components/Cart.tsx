/* eslint-disable max-len */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFullPrice } from '../helpers/getFullPrice';
import { useLocalStorage } from '../helpers/useLocalStorage';
import { Product } from '../types/Product';
import { CartItem } from './CartItem';

const getTotalPrice = (products: Product[]) => {
  let result = 0;

  for (let i = 0; i < products.length; i += 1) {
    result += getFullPrice(products[i].price, products[i].discount) * products[i].number;
  }

  return result;
};

export const Cart = () => {
  const [products, save] = useLocalStorage<Product[]>('products', []);
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(getTotalPrice(products));
  const [isPopUp, setIsPopUp] = useState(false);

  useEffect(() => {
    setTotalPrice(getTotalPrice(products));
  }, [products]);

  return (
    <div className="container grid">
      <button
        data-cy="backButton"
        type="button"
        className="product__back grid__item--1-2 small-text"
        onClick={() => navigate(-1)}
      >
        <img src="img/svg/arrow-left-grey.svg" alt="Arrow left" />

        <div>Back</div>
      </button>

      <h1 className="cart__title grid__item--1-5">Cart</h1>

      {products.length > 0
        ? (
          <>
            <div className="cart__list grid__item--1-16">
              {products
                .sort((a: Product, b: Product) => a.age - b.age)
                .map((product: Product) => (
                  <CartItem
                    key={product.id}
                    product={product}
                    save={save}
                    products={products}
                    setTotalPrice={setTotalPrice}
                    totalPrice={totalPrice}
                  />
                ))}
            </div>
            <div className="cart__checkout grid__item--17-24">
              <h1 className="cart__totalPrice">{`$${totalPrice}`}</h1>
              <p className="body-text cart__total">{`Total for ${products.length} items`}</p>
              <hr className="product__line" />

              <button
                type="button"
                className="cart__co-button button-text"
                onClick={() => {
                  setIsPopUp(true);

                  setTimeout(() => {
                    setIsPopUp(false);
                  }, 3000);
                }}
              >
                Checkout
              </button>

              {isPopUp
                && (
                  <div className="cart__popup">
                    <p className="body-text">We are sorry, but this feature is not implemented yet</p>
                  </div>
                )}
            </div>
          </>
        ) : <h1 className="grid__item--1-10">Your cart is empty</h1>}
    </div>
  );
};
