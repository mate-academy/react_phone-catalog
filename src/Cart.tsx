import classNames from 'classnames';
import { useState, useContext, useEffect } from 'react';
import { Loader } from './Loader';
import { Context } from './Context';
import { CartProduct } from './types/CartProduct';
import { GoBack } from './GoBack';

export const Cart = () => {
  const {
    productsToBuy,
    setProductsToBuy,
    loadingItem,
    setLoadingItem,
  } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);
  const [isMessageActive, setIsMessageActive] = useState(false);

  const remove = (id: string) => {
    setLoadingItem(id);

    setTimeout(() => {
      const toBuy = productsToBuy.filter(device => device.id !== id);

      setProductsToBuy(toBuy);
      setLoadingItem('');
    }, 1000);
  };

  const update = (index: number, num: number, item: CartProduct) => {
    const newItem = {
      ...item,
      quantity: num,
    };

    const toBuy = ([
      ...productsToBuy.slice(0, index),
      newItem,
      ...productsToBuy.slice(index + 1),
    ]);

    setProductsToBuy(toBuy);
  };

  const getRealPrice = (price: number, discount: number) => {
    return price - (price * discount) / 100;
  };

  const getCost = () => {
    let cost = 0;

    productsToBuy.forEach(product => {
      if (product.item.discount === 0) {
        cost += (product.item.price * product.quantity);
      } else {
        cost += (getRealPrice(
          product.item.price,
          product.item.discount,
        ) * product.quantity);
      }
    });

    return cost;
  };

  const getQuantity = () => {
    let quantity = 0;

    productsToBuy.forEach(product => {
      quantity += product.quantity;
    });

    return quantity;
  };

  const OnCheckout = () => {
    setIsMessageActive(true);

    setTimeout(() => {
      setIsMessageActive(false);
    }, 3000);
  };

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <div className="cart">
      <GoBack />
      <h1 className="cart__title">Cart</h1>

      {isLoading && (
        <div className="cart__loader_container">
          <Loader />
        </div>
      )}

      {(productsToBuy.length > 0 && !isLoading) && (
        <div className="cart__container">
          <div className="cart__products">
            {productsToBuy.map((item, index) => (
              item.id !== loadingItem ? (
                <div className="cart__item">
                  <div className="cart__content">
                    <button
                      type="button"
                      aria-label="Delete"
                      className="cart__button"
                      onClick={() => remove(item.id)}
                    />
                    <img
                      className="cart__image"
                      src={item.item.imageUrl
                        .split('phones').join('products')}
                      alt={`${item.item.id}`}
                    />
                    <h4 className="cart__subtitle">{item.item.name}</h4>
                  </div>
                  <div className="cart__amount">
                    <div className="cart__quantity">
                      <button
                        type="button"
                        aria-label="Remove"
                        className={classNames(
                          'cart__changeAmount cart__remove',
                          {
                            'cart__changeAmount--disabled':
                            item.quantity < 2,
                          },
                        )}
                        disabled={item.quantity < 2}
                        onClick={() => update(index, item.quantity - 1, item)}
                      />

                      <div className="cart__number">
                        {item.quantity}
                      </div>

                      <button
                        type="button"
                        aria-label="Add"
                        className={classNames(
                          'cart__changeAmount cart__add',
                          {
                            'cart__changeAmount--disabled':
                            item.quantity > 4,
                          },
                        )}
                        disabled={item.quantity > 4}
                        onClick={() => update(index, item.quantity + 1, item)}
                      />
                    </div>

                    {item.item.discount === 0 ? (
                      <div className="cart__price">{`$${item.item.price}`}</div>
                    ) : (
                      <div className="cart__price">{`$${getRealPrice(item.item.price, item.item.discount)}`}</div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="cart__list_container">
                  <div className="cart__item">
                    <div className="cart__content">
                      <button
                        type="button"
                        aria-label="Delete"
                        className="cart__button"
                        onClick={() => remove(item.id)}
                      />
                      <img
                        className="cart__image"
                        src={item.item.imageUrl
                          .split('phones').join('products')}
                        alt={`${item.item.id}`}
                      />
                      <h4 className="cart__subtitle">{item.item.name}</h4>
                    </div>
                    <div className="cart__amount">
                      <div className="cart__quantity">
                        <button
                          type="button"
                          aria-label="Remove"
                          className={classNames(
                            'cart__changeAmount cart__remove',
                            {
                              'cart__changeAmount--disabled':
                              item.quantity < 2,
                            },
                          )}
                          disabled={item.quantity < 2}
                          onClick={() => update(index, item.quantity - 1, item)}
                        />

                        <div className="cart__number">
                          {item.quantity}
                        </div>

                        <button
                          type="button"
                          aria-label="Add"
                          className={classNames(
                            'cart__changeAmount cart__add',
                            {
                              'cart__changeAmount--disabled':
                              item.quantity > 4,
                            },
                          )}
                          disabled={item.quantity > 4}
                          onClick={() => update(index, item.quantity + 1, item)}
                        />
                      </div>

                      {item.item.discount === 0 ? (
                        <div className="cart__price">{`$${item.item.price}`}</div>
                      ) : (
                        <div className="cart__price">{`$${getRealPrice(item.item.price, item.item.discount)}`}</div>
                      )}
                    </div>
                  </div>
                  <div className="cart__list_loader">
                    <Loader />
                  </div>
                </div>
              )
            ))}
          </div>
          <div className="cart__checkout">
            <h2 className="cart__totalCost">
              {`$${getCost()}`}
            </h2>
            <div className="cart__totalQuantity">
              {`Total for ${getQuantity()} ${getQuantity() === 1 ? 'item' : 'items'}`}
            </div>
            <div className="cart__line" />
            <button
              type="button"
              aria-label="checkout"
              className="cart__mainButton"
              onClick={OnCheckout}
            >
              Checkout
            </button>
            <div
              className={classNames(
                'cart__checkout_message',
                { 'cart__checkout_message--active': isMessageActive },
              )}
            >
              Sorry, this feature is not emplemented yet.
            </div>
          </div>
        </div>
      )}

      {(productsToBuy.length === 0 && !isLoading) && (
        <h2 className="cart__title cart__title--error">
          Products not found
        </h2>
      )}
    </div>
  );
};
