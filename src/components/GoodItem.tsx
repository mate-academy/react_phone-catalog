import React from 'react';
import { Basket } from '../interfaces';
import { Phone } from '../interfaces';
import { setBasket, removeItem } from '../store/basket';
import { useDispatch } from 'react-redux';

interface Props {
  goodItem: Basket;
}

export const GoodItem: React.FC<Props> = ({ goodItem }) => {
  const dispatch = useDispatch();
  const handleClickAdd = (goodItem: Phone) => {
    dispatch(setBasket(goodItem))
  }

  const handleClickRemove = (id: string) => {
    dispatch(removeItem(id))
  }

  return (
    <li className="goods__item">
      {
        goodItem.goodItem && (
          <>
            <button className="goods__delete button button-delete">x</button>
            <img src={goodItem.goodItem.imageUrl} alt={goodItem.goodItem.name} className="goods__img"/>
            <p className="goods__title">{goodItem.goodItem.name}</p>
            <div className="goods__wrapper">
              <button
                className="button button-minus goods__button"
                onClick={() => handleClickRemove(goodItem.id)}
              >
                -
              </button>
              <p>{goodItem.quantity}</p>
              <button
                className="button button-plus goods__button"
                onClick={() => handleClickAdd(goodItem.goodItem)}
              >
                +
              </button>
            </div>
            <p className="goods__price">&#x24;{goodItem.quantity * goodItem.goodItem.price * (1 - goodItem.goodItem.discount / 100)}</p>
          </>
        )
      }

    </li>
  );
}
