/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-console */
import React, { useEffect, useMemo, useState } from 'react';
import './BasketPages.scss';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Products';
import { useSearchContext } from '../../components/Context/Context';
import { BackButton } from '../../components/BackButton/BackButton';
import { EmptyCard } from '../../components/EmptyCard/EmptyCard';

export const BasketPages: React.FC = () => {
  const [basketProducts, setBasketProducts] = useState<Product[]>([]);
  const {
    handleRemoveFromBasket,
    getBasket,
    visibleProducts,
    increment,
    decrement,
    getProductCount,
  } = useSearchContext();
  const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/_new/';

  useEffect(() => {
    setBasketProducts(getBasket);
  }, [getBasket]);

  const totalPrice = useMemo(() => {
    return basketProducts.reduce((sum, product) => sum + product.price, 0);
  }, [basketProducts]);

  return (
    <section className="basket">
      <div className="container">
        <BackButton />
        <div className="basket__title">Cart</div>

        {basketProducts.length ? (
          <div className="basket__container">
            <div className="basket__list">
              {visibleProducts.map(item => (
                <div
                  className="basket__item"
                  key={item.id}
                >
                  <div className="basket__item-left">
                    <button
                      className="basket__item-remove"
                      data-cy="cartDeleteButton"
                      type="button"
                      onClick={() => handleRemoveFromBasket(item.phoneId)}
                      aria-label="Counter Remove"
                    >
                      <div className="basket__item-icon">
                        <span />
                        <span />
                      </div>
                    </button>

                    <div className="basket__item-img">
                      <img
                        src={`${BASE_URL}/${item.image}`}
                        alt="productImg"
                      />
                    </div>

                    <Link
                      to={`/${item.category}/${item.itemId}`}
                      className="basket__item-link"
                    >
                      {item.name}
                    </Link>
                  </div>

                  <div className="basket__item-right">
                    <div className="basket__item--counter">
                      <button
                        className="basket__item--counter-btn"
                        type="button"
                        onClick={() => decrement(item)}
                        disabled={getProductCount(item.id) === 1}
                        aria-label="Counter Decrement"
                      >
                        <div className="basket__item--counter-minus" />
                      </button>

                      <div className="basket__item--counter-value">
                        {getProductCount(item.id)}
                      </div>

                      <button
                        className="basket__item--counter-btn"
                        type="button"
                        onClick={() => increment(item)}
                        aria-label="Counter Increment"
                      >
                        <div className="basket__item--counter-plus" />
                      </button>
                    </div>

                    <div className="basket__item-price">{`$${item.price}`}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="basket__checkout">

              <p
                className="basket__checkout-price"
                data-cy="productQauntity"
              >
                {`$${totalPrice}`}
              </p>

              <p className="basket__checkout-items">
                {`Total for ${basketProducts.length} items`}
              </p>
              <span className="basket__checkout-line" />

              <button
                className="basket__checkout-btn"
                type="button"
                // onClick={hadleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>

        ) : (
          <EmptyCard title="basket" />
        )}

      </div>
    </section>
  );
};
