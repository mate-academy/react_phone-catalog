import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ProductCart } from '../../Components/ProductCart/ProductCart';
import './Cart.scss';
import { useLocaleStorage } from '../../Helpers/LocaleStorage';
import { EmptyPage } from '../EmptyPage/EmptyPage';
import { Location } from '../../Components/Location/Location';
import { querySort } from '../../Helpers/Helpers';
import { Product } from '../../Types/Product';

export const Cart = () => {
  /* eslint-disable no-return-assign */
  let totalSum = 0;

  const [
    orderedProducts,
    setOrderedProducts,
  ] = useLocaleStorage<Product[]>('orderedItems', []);

  const [searchParams] = useSearchParams();
  const [sum, setSum] = useState(totalSum);

  const query = searchParams.get('query') || '';

  const preparetedProdutcs = querySort(orderedProducts, query);

  const onDelete = (product: Product, count: number) => {
    setSum((prev) => prev - (product.price * count));
    setOrderedProducts(
      [...orderedProducts.filter((item) => item.id !== product.id)],
    );
  };

  useEffect(() => {
    preparetedProdutcs.forEach((p) => totalSum += p.price);
    setSum(totalSum);
  }, [query, orderedProducts]);

  return (
    <section className="cart">
      <div className="container">
        <Location />
        <div className="cart__container">
          {!preparetedProdutcs.length ? (
            <EmptyPage />
          ) : (
            <>
              <ul className="cart__list">
                {preparetedProdutcs.map((product) => (
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
                    {`Total for ${preparetedProdutcs.length} items`}
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
