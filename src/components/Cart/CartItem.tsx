import React, { useContext, useEffect, useState } from 'react';
import CN from 'classnames';
import { CartContext } from './CartContext';

type Props = {
  item: ProductItem;
};

export const CartItem: React.FC<Props> = ({ item }) => {
  const {
    removeFromCart,
    isAdded,
    totalQuantity,
    setTotalQuantity,
    totalCost,
    setTotalCost,
  } = useContext(CartContext);

  const [counter, setCounter] = useState(1);
  const [itemCost, setItemCost] = useState(0);

  const counterIncrease = () => {
    setCounter(counter + 1);
    setTotalQuantity(totalQuantity + 1);
    setTotalCost(totalCost + (item.price - item.price * (item.discount / 100)));
  };

  const counterDecrease = () => {
    setCounter(counter - 1);
    setTotalQuantity(totalQuantity - 1);
    setTotalCost(totalCost - item.price);
  };

  useEffect(() => {
    setItemCost(counter * (item.price - item.price * (item.discount / 100)));
  }, [counter, item.price]);

  const handleRemoveItem = () => {
    setTotalQuantity(totalQuantity - counter);
    setTotalCost(totalCost - itemCost);
  };

  return (
    <>
      <button
        type="button"
        className="cart__button cart__button--delete"
        onClick={() => {
          handleRemoveItem();
          if (isAdded(item)) {
            removeFromCart(item);
          }
        }}
      >
      </button>
      <img
        className="cart__productImg"
        src={item.imageUrl}
        alt="Product"
      />
      <div className="cart__productName">{item.name}</div>
      <div className="cart__itemQuantity">
        <button
          type="button"
          className={CN('lift__button lift__button--decrease',
            { disabledBtn: `${counter}` === '1' })}
          onClick={counterDecrease}
          disabled={`${counter}` === '1'}
        >
          -
        </button>
        <p className="counter__value">{counter}</p>
        <button
          type="button"
          className="lift__button lift__button--increse"
          onClick={counterIncrease}
        >
          +
        </button>
      </div>
      <h2 className="counter__cost">
        $
        {itemCost}
      </h2>
    </>
  );
};
