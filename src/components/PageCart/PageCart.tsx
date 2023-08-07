import { useEffect, useState } from 'react';
import {
  useAppDispatch,
  useAppSelector,
  useLocaleStorage,
} from '../../app/hooks';
import {
  addItemBasket,
  removeAllItems,
  removeItemFromBasket,
  removeItemInBasket,
} from '../../feature/basket';
import { Product } from '../../type/Product';
import { basketItems } from '../../app/store';
import BasketItem from '../BasketItem';
import { BasketCompleted } from '../BasketCompleted/BasketCompleted';
import './PageCart.scss';

const handGoBack = () => {
  window.history.back();
};

export const PageCart = () => {
  const [basketBuy, setBasket] = useLocaleStorage<Product[]>('prodBuy', []);
  const [buy, setBuy] = useState(false);

  const dispatch = useAppDispatch();
  const { basketItem } = useAppSelector(basketItems);

  let allCount = 0;

  for (let i = 0; i < basketBuy.length; i += 1) {
    if (basketBuy[i].quantity) {
      allCount += basketBuy[i].quantity
        * ((basketBuy[i].price * (100 - basketBuy[i].discount)) / 100);
    } else {
      allCount += (basketBuy[i].price * (100 - basketBuy[i].discount)) / 100;
    }
  }

  useEffect(() => {
    setBasket(basketItem);
  }, [basketItem]);

  const handCheckedBascked = () => {
    setBuy(true);
    dispatch(removeAllItems({}));
  };

  const addItem = (item: Product) => {
    dispatch(addItemBasket(item));
  };

  const removeItem = (item: Product) => {
    dispatch(removeItemInBasket(item));
  };

  const removeProduct = (item: Product) => {
    dispatch(removeItemFromBasket(item));
  };

  let countCart = 0;

  basketItem.forEach((el: Product) => {
    if (Object.hasOwnProperty.call(el, 'quantity')) {
      countCart += el.quantity;
    } else {
      countCart += 1;
    }
  });

  return (
    <>
      <div className="breadcrumbs__back">
        <span className="breadcrumbs__arrow breadcrumbs__arrow--back" />

        <button
          className="breadcrumbs__go-back"
          onClick={handGoBack}
          type="button"
        >
          Back
        </button>
      </div>

      {!buy ? (
        <div className="cart main__section">
          <h1 className="main__section--title cart__title">Cart</h1>

          <div className="cart__block">
            {basketBuy.length === 0 && (
              <h2 className="main__section--title completed__title">
                Cart is empty
              </h2>
            )}
            <ul className="cart__list">
              {basketItem.map(b => (
                <BasketItem
                  product={b}
                  addItem={addItem}
                  removeItem={removeItem}
                  removeProduct={removeProduct}
                  key={b.id}
                />
              ))}
            </ul>

            <div className="cart__checkout">
              <div className="cart__info">
                <div className="cart__all-price">{`$${allCount}`}</div>

                <span className="cart__count">{`Total for ${countCart} items`}</span>
              </div>

              <div className="cart__line" />

              <button
                onClick={() => basketBuy.length !== 0 && handCheckedBascked()}
                className="card__btn card__btn--buy btn--checkout"
                type="button"
                aria-label="btn"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <BasketCompleted />
      )}
    </>
  );
};
