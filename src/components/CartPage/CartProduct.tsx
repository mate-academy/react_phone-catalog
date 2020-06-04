import React, { useState, useEffect, useContext } from 'react';
import './CartProduct.scss';
import { CartContext } from '../../helpers/CartContext';

type Props = {
  item: Phone;
};

const CartProduct: React.FC<Props> = ({ item }) => {
  const {
    removeFromCart, isAddedToCart, totalCount, setTotalCount, totalCost, setTotalCost,
  } = useContext(CartContext);

  const [counter, setCounter] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  const counterPlus = () => {
    setCounter(counter + 1);
    setTotalCount(totalCount + 1);
    setTotalCost(totalCost + item.price);
  };

  const counterMinus = () => {
    if (counter > 1) {
      setCounter(counter - 1);
      setTotalCount(totalCount - 1);
      setTotalCost(totalCost - item.price);
    }
  };

  useEffect(() => {
    setTotalPrice(counter * item.price);
  }, [counter, item.price]);

  const onDeleteItem = () => {
    setTotalCount(totalCount - counter);
    setTotalCost(totalCost - totalPrice);
  };

  return (
    <div className="cart-page__card">
      <div className="cart-page__description" />
      <button
        onClick={() => {
          onDeleteItem();
          if (isAddedToCart(item)) {
            removeFromCart(item);
          }
        }}
        type="button"
        className="cart-page__button-delete"
      >
        <img src="./img/closeNoActive.svg" alt="item galery" />
      </button>
      <img className="cart-page__image" src={item.imageUrl} alt="item" />
      <p className="cart-page__text">{item.name}</p>
      <div className="cart-page__action">
        <button type="button" onClick={counterPlus} className="cart-page__plus">+</button>
        <p className="cart-page__counter">{counter}</p>
        <button type="button" onClick={counterMinus} className="cart-page__minus">-</button>
        <p className="cart-page__price">
          $
          {totalPrice}
        </p>
      </div>
    </div>
  );
};

export default CartProduct;
