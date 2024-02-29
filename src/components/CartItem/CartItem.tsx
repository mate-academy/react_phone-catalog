import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PhoneCatalogContext } from '../../PhoneCatalogContext';
import { setDataToLocalStorage } from '../../utils/LocalStorage';

type Props = {
  itemName: string;
  count: number;
  id: string;
  phoneId: string;
};

export const CartItem: React.FC<Props> = ({
  itemName,
  count,
  id,
  phoneId,
}) => {
  const {
    cart,
    setCart,
    setSelectedId,
  } = useContext(PhoneCatalogContext);

  const navigate = useNavigate();

  const itemFromList = cart.find(item => item.name === itemName);

  const handleDelete = (idStr: string) => {
    setCart(cart.filter(item => item.id !== idStr));
  };

  const handleMinus = (c: number) => {
    if (count === 1) {
      handleDelete(id);
    } else {
      const updatedCart = cart.map(item => {
        return item.id === id ? { ...item, quantity: c - 1 } : item;
      });

      setCart(updatedCart);
      setDataToLocalStorage('cart', updatedCart);
    }
  };

  const handlePlus = (c: number) => {
    const updatedCart = cart.map(item => {
      return item.id === id ? { ...item, quantity: c + 1 } : item;
    });

    setCart(updatedCart);
    setDataToLocalStorage('cart', updatedCart);
  };

  const handleItemSelect = (itemId: string) => {
    setSelectedId(itemId);
    navigate(`/phones/${itemId}`);
  };

  return (
    <div className="cartItem" key={itemName}>
      <button
        type="button"
        aria-label="delete"
        className="cartItem__delete"
        onClick={() => handleDelete(id)}
      />
      <div className="cartItem__image">
        <img
          src={`https://mate-academy.github.io/react_phone-catalog/_new/${itemFromList?.image}`}
          alt={itemName}
          className="cartItem__img"
        />
      </div>
      <div
        className="cartItem__name cartItem__name--normal"
        role="button"
        tabIndex={0}
        onClick={() => handleItemSelect(phoneId)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === 'Space') {
            handleItemSelect(phoneId);
          }
        }}
      >
        {itemName}
      </div>
      <div className="cartItem__count">
        <button
          className="cartItem__count__box cartItem__count__minus"
          type="button"
          aria-label="minus"
          onClick={() => handleMinus(count)}
        >
          <div className="cartItem__count__minusImg" />
        </button>
        <div className="cartItem__count__box cartItem__count__number">
          {count}
        </div>
        <button
          className="cartItem__count__box cartItem__count__plus"
          type="button"
          aria-label="plus"
          onClick={() => handlePlus(count)}
        >
          <div className="cartItem__count__plusImg" />
        </button>
      </div>
      <div className="cartItem__price cartItem__price--bold">{`$${itemFromList?.price}`}</div>
    </div>
  );
};
