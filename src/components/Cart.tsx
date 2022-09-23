/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFullPrice } from '../helpers/getFullPrice';
import { useLocalStorage } from '../helpers/useLocalStorage';
import { Product } from '../types/Product';
import { CartItem } from './CartItem';

const getTotalPrice = (products: Product[]) => {
  let res = 0;

  for (let i = 0; i < products.length; i += 1) {
    res += getFullPrice(products[i].price, products[i].discount) * products[i].number;
  }

  return res;
};

export const Cart = () => {
  const [products, save] = useLocalStorage<Product[]>('products', []);
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(getTotalPrice(products));

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
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M10.4712 3.52861C10.2109 3.26826 9.78878 3.26826 9.52843 3.52861L5.52843 7.52861C5.26808 7.78896 5.26808 8.21107 5.52843 8.47141L9.52843 12.4714C9.78878 12.7318 10.2109 12.7318 10.4712 12.4714C10.7316 12.2111 10.7316 11.789 10.4712 11.5286L6.94265 8.00001L10.4712 4.47141C10.7316 4.21107 10.7316 3.78896 10.4712 3.52861Z" fill="#89939A" />
        </svg>

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
              <h1 className="cart__totalprice">{`$${totalPrice}`}</h1>
              <p className="body-text cart__total">{`Total for ${products.length} items`}</p>
              <hr className="product__line" />

              <button
                type="button"
                className="cart__co-button button-text"
              >
                Checkout
              </button>
            </div>
          </>
        )
        : <h1 className="grid__item--1-10">Your cart is empty</h1>}
    </div>
  );
};
