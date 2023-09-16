import {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { CartContext } from '../../store/CartContext';

import './style.scss';

import { useLocalStorage } from '../../hooks/useLocalStorage';
import { ButtonGoBack } from '../../components/ButtonGoBack/ButtonGoBack';
import { CartProduct } from '../../components/CartProduct/CartProduct';
import { Amount } from '../../types/Amount';
import { Checkout } from '../../components/Checkout/Checkout';
import { Titles } from '../../types/Titles';

export const CartPage = () => {
  const { cartProducts, deleteFromCart } = useContext(CartContext);
  const [
    amountOfItem, setAmountOfItem,
  ] = useLocalStorage<Amount[]>('cartAmount', []);
  const [isClicked, setIsClicked] = useState(false);

  const changeAmount = (id: string, value: number) => {
    const updatedAmount = amountOfItem.map((item) => {
      return item.itemId === id
        ? {
          ...item,
          quantity: item.quantity + value > 0
            ? item.quantity + value
            : item.quantity,
        }
        : { ...item };
    });

    setAmountOfItem(updatedAmount);
  };

  useEffect(() => {
    const initialAmount = cartProducts.map(product => {
      return ({
        itemId: product.itemId,
        quantity: amountOfItem
          .find(({ itemId }) => itemId === product.itemId)?.quantity || 1,
      });
    });

    setAmountOfItem(initialAmount);
  }, [cartProducts]);

  const total = useMemo(() => {
    return cartProducts.reduce((acum, cur) => {
      const quantity = amountOfItem
        .find(({ itemId }) => cur.itemId === itemId)?.quantity || 1;

      return acum + cur.price * quantity;
    }, 0);
  }, [cartProducts, amountOfItem]);

  const totalItems = useMemo(() => {
    return amountOfItem.reduce((acum, cur) => acum + cur.quantity, 0);
  }, [amountOfItem]);

  return (
    <section className="cart-page">
      <div className="cart-page__back">
        <ButtonGoBack />
      </div>
      <h1 className="cart-page__title">{Titles.CART}</h1>
      <div className="cart-page__products">
        {cartProducts.length > 0 && (
          cartProducts.map(product => (
            <CartProduct
              key={product.id}
              product={product}
              onDelete={deleteFromCart}
              onChange={changeAmount}
              amount={amountOfItem
                .find(item => product.itemId === item.itemId)?.quantity || 1}
            />
          ))
        )}
      </div>
      <div className="cart-page__checkout">
        <Checkout
          total={total}
          totalItems={totalItems}
          onClick={setIsClicked}
          isClicked={isClicked}
        />
      </div>
    </section>
  );
};
