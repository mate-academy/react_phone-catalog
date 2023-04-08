import { useEffect, useState } from 'react';
import { Product } from '../../Types/Product';
import { ProductCart } from '../../Components/ProductCart/ProductCart';
import './Cart.scss';
import { useLocaleStorage } from '../../Helpers/LocaleStorage';
import { EmptyPage } from '../EmptyPage/EmptyPage';
import { Location } from '../../Components/Location/Location';

export const Cart = () => {
  /* eslint-disable no-return-assign */
  let totalSum = 0;

  const [
    orderedProducts,
    setOrderedProducts,
  ] = useLocaleStorage('orderedItems', []);
  const [sum, setSum] = useState(totalSum);

  const onDelete = (product: Product, count: number) => {
    setSum((prev) => prev - (product.price * count));
    setOrderedProducts(product);
  };

  useEffect(() => {
    orderedProducts.forEach((p) => totalSum += p.price);
    setSum(totalSum);
  }, [orderedProducts]);

  return (
    <section className="cart">
      <div className="container">
        <Location />
        <div className="cart__container">
          {!orderedProducts.length ? (
            <EmptyPage />
          ) : (
            <>
              <ul className="cart__list">
                {orderedProducts.map((product) => (
                  <li key={product.id}>
                    <ProductCart
                      product={product}
                      onDelete={onDelete}
                      setSum={setSum}
                    />
                  </li>
                ))}
              </ul>

              <div className="cart__total">
                <div className="cart__total-wrapper">
                  <h1 className="cart__total-price">
                    $
                    {sum}
                  </h1>

                  <p>
                    {`Total for ${orderedProducts.length} items`}
                  </p>
                </div>

                <button type="button" className="cart__button">Checkout</button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
