import React, { useEffect, useState } from 'react';

import { BackButton } from '../../components/BackButton';
import { CartItem } from '../../components/CartItem';

import { useCounter } from '../../components/Context/Context';

import './CartPage.scss';

export const CartPage: React.FC = () => {
  const [productFromCart, setProductFromCart] = useState<Product[]>([]);
  const [totalCost, setTotalCost] = useState<number>();
  const [openerNotification, setOpenerNotification] = useState<boolean>(false);

  const context = useCounter();

  const getDateFromStorage = () => {
    const getStorage = localStorage.getItem('cart');

    const parseStorage = JSON.parse(getStorage || '');

    return parseStorage;
  };

  const updateAllCost = () => {
    const dateFromStorage = getDateFromStorage();
    const allCost: number[] = [];

    dateFromStorage.forEach((item: Product) => {
      allCost.push(((100 - item.discount) / 100) * item.price * item.quantity);
    });

    const priceReduce = allCost
      .reduce((prev: number, curr: number) => prev + curr, 0);

    setTotalCost(priceReduce);
  };

  useEffect(() => {
    const dateFromStorage = getDateFromStorage();

    setProductFromCart(dateFromStorage);

    updateAllCost();
  }, []);

  const deleteCart = (id: string) => {
    const dateFromStorage = getDateFromStorage();

    const delCart = dateFromStorage
      .filter((product: Product) => product.id !== id);

    setProductFromCart(delCart);
    localStorage.setItem('cart', JSON.stringify(delCart));

    if (context) {
      context.counterCart(-1);
    }

    updateAllCost();
  };

  const notification = () => {
    setOpenerNotification(true);

    setTimeout(() => {
      setOpenerNotification(false);
    }, 3000);
  };

  return (
    <div className="container">
      <div className="CartPage">
        <BackButton />
        <h2 className="CartPage__title">Cart</h2>
        <div className="CartPage__content">
          <div className="CartPage__items">
            {productFromCart.length > 0
              ? productFromCart.map(product => (
                <CartItem
                  key={product.id}
                  product={product}
                  deleteCart={deleteCart}
                  updateAllCost={updateAllCost}
                />
              ))
              : <span className="CartPage__empty">Cart is empty!</span>}
          </div>
          {totalCost !== 0 && (
            <div className="CartPage__totalPrice">
              <p className="CartPage__totalCost">
                $
                {totalCost}
              </p>
              <p className="CartPage__totalItems">
                Total for
                {' '}
                {productFromCart.length}
                {' '}
                items
              </p>
              <div className="CartPage__separator" />
              <button
                type="button"
                className="CartPage__checkout"
                onClick={() => notification()}
              >
                Checkout
              </button>

              {openerNotification && (
                <p
                  className="CartPage__notification"
                >
                  Sorry! This functionality is not implemented yet
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
