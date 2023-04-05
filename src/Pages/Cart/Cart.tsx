import { Product } from '../../Types/Product';
import { ProductCart } from '../../Components/ProductCart/ProductCart';
import './Cart.scss';
import { useEffect, useState } from 'react';
import { useLocaleStorage } from '../../Helpers/LocaleStorage';

export const Cart = () => {
  let totalSum = 0;

  const [orderedProducts, setOrderedProducts] = useLocaleStorage('orderedItems', []);
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
      <div className="cart__container">
        <ul className="cart__list">
          {orderedProducts.map((product) => (
            <li key={product.id}>
              <ProductCart product={product} onDelete={onDelete} setSum={setSum} />
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
              Total for
              {orderedProducts.length}
              {' '}
              items
            </p>
          </div>

          <button className="cart__button">Checkout</button>
        </div>

      </div>
    </section>
  );
};
